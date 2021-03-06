import * as Yup from "yup";

import { DropdownCombobox, ListingComboBoxOption, Toggle } from "../fields";
import { Form, Formik, FormikProps } from "formik";
import { ResetButton, SubmitButton } from "components/buttons";
import {
  categoryList,
  collectibleList,
  conditionList,
  gradingCompanyList,
  gradingList,
  sportsCardList,
  tradingCardList,
} from "constants/listings";
import { createRef, useState } from "react";

import { FilterIconSm } from "components/icons";
import { NumberField } from "../fields";
import { Popover } from "@headlessui/react";
import { countryList } from "constants/address";
import { useRouter } from "next/router";

interface filterValues {
  [index: string]: string;
  min_price: string;
  max_price: string;
  category: string;
  subcategory: string;
  graded: string;
  grading_company: string;
  min_condition: string;
  shipping_country: string;
}

const filterSchema = Yup.object().shape({
  min_price: Yup.number().positive("Min price must be positive"),
  max_price: Yup.number()
    .when("gt", (gt, schema) => {
      return gt
        ? schema.moreThan(gt, "Max price must be higer than min price")
        : schema.positive("Max price must be positive");
    })
    .max(99999999.99, "Max price must be less than 99999999.99"),
  category: Yup.mixed().oneOf(
    categoryList
      .map((category) => {
        return category.value;
      })
      .concat("")
  ),
  subcategory: Yup.mixed()
    .when("category", {
      is: "SPORTS_CARDS",
      then: Yup.mixed().oneOf(
        sportsCardList
          .map((sports_card) => {
            return sports_card.value;
          })
          .concat("")
      ),
    })
    .when("category", {
      is: "TRADING_CARDS",
      then: Yup.mixed().oneOf(
        tradingCardList
          .map((trading_card) => {
            return trading_card.value;
          })
          .concat("")
      ),
    })
    .when("category", {
      is: "COLLECTIBLES",
      then: Yup.mixed().oneOf(
        collectibleList
          .map((collectible) => {
            return collectible.value;
          })
          .concat("")
      ),
    }),
  grading_company: Yup.mixed().when("graded", {
    is: true,
    then: Yup.mixed().oneOf(
      gradingCompanyList.map((gradingCompany) => {
        return gradingCompany.value;
      }),
      "This is not a valid grading company"
    ),
  }),
  min_condition: Yup.mixed().when("grading_company", {
    is: "",
    then: Yup.mixed().oneOf(
      conditionList["default"]
        .map((condition) => {
          return condition.value;
        })
        .concat(""),
      "This is not a valid condition"
    ),
    otherwise: Yup.mixed().oneOf(
      gradingList
        .map((grading) => {
          return grading.value;
        })
        .concat(""),
      "This is not a valid grading"
    ),
  }),
});

const subcategoryRef = createRef<HTMLSpanElement>();
const gradingCompanyRef = createRef<HTMLSpanElement>();
const conditionRef = createRef<HTMLSpanElement>();

function subCategoryCombobox(formik: FormikProps<any>) {
  const category = formik.values.category;
  const placeholder = category
    ? "Select a sub-category"
    : "Select category first";

  let items: ListingComboBoxOption[] = [];
  switch (category) {
    case "SPORTS_CARDS":
      items = sportsCardList;
      break;
    case "TRADING_CARDS":
      items = tradingCardList;
      break;
    case "COLLECTIBLES":
      items = collectibleList;
      break;
  }

  return (
    <DropdownCombobox
      name="subcategory"
      label="Sub-category"
      items={items}
      placeholder={placeholder}
      disabled={!category}
      resetRef={subcategoryRef}
    />
  );
}

export default function SearchFilter(): JSX.Element {
  const router = useRouter();
  const [graded, setGraded] = useState(
    new URLSearchParams(router.asPath.split("?")[1]).get("graded") == "true"
  );

  function renderGrading(formik: FormikProps<any>) {
    const label = graded ? "Grading or better" : "Condition or better";
    const items = graded ? gradingList : conditionList[formik.values.category];

    return (
      <>
        {graded ? (
          <DropdownCombobox
            name="grading_company"
            label="Graded by"
            items={gradingCompanyList}
            resetRef={gradingCompanyRef}
            hidden={!graded}
          />
        ) : null}
        <DropdownCombobox
          name="min_condition"
          label={label}
          items={items}
          resetRef={conditionRef}
        />
      </>
    );
  }

  const initialValues: filterValues = {
    min_price: "",
    max_price: "",
    category: "",
    subcategory: "",
    graded: "",
    grading_company: "",
    min_condition: "",
    shipping_country: "",
  };

  const params = new URLSearchParams(router.asPath.split("?")[1]);
  for (const key in initialValues) {
    initialValues[key] = params.get(key) || "";
  }

  return (
    <Popover>
      {({ close }) => (
        <div className="relative">
          <Popover.Button className="inline-flex items-center gap-2 p-2 bg-white border rounded-md border-accent hover:text-primary">
            <FilterIconSm /> <span className="hidden md:flex">Filter</span>
          </Popover.Button>
          <Popover.Panel>
            <div className="absolute z-10 p-2 px-4 border rounded-lg top-12 bg-accent-lightest border-accent-light">
              <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={filterSchema}
                onSubmit={(values, actions) => {
                  router.push({
                    pathname: router.pathname,
                    query: { ...router.query, ...values },
                  });
                  actions.setSubmitting(false);
                  close();
                }}
                onReset={(values) => {
                  setGraded(false);
                  for (const filter in values) {
                    delete router.query[filter];
                  }
                  delete router.query.page;
                  router.push({
                    pathname: router.pathname,
                    query: { ...router.query },
                  });
                  close();
                }}
              >
                {(formik) => (
                  <Form>
                    <div className="space-y-1">
                      <h5 className="p-2 text-center border-b">
                        Select Filters
                      </h5>

                      <NumberField
                        name="min_price"
                        label="Min Price"
                        placeholder="Min"
                      />
                      <NumberField
                        name="max_price"
                        label="Max Price"
                        placeholder="Max"
                      />

                      <DropdownCombobox
                        name="category"
                        label="Category"
                        items={categoryList}
                        placeholder="Select a category"
                        childresetRef={subcategoryRef}
                      />
                      {subCategoryCombobox(formik)}

                      <Toggle
                        name="graded"
                        label="Graded?"
                        enabled={graded}
                        setEnabled={setGraded}
                        onClick={async () => {
                          gradingCompanyRef.current?.click();
                          conditionRef.current?.click();
                          formik.setFieldValue("graded", !graded);
                        }}
                      />
                      {renderGrading(formik)}

                      <DropdownCombobox
                        label="Item Location"
                        name="shipping_country"
                        placeholder={
                          formik.getFieldProps("shipping_country").value
                            ? ""
                            : "Select country"
                        }
                        items={countryList}
                      />
                      <div className="inline-flex py-2 space-x-2">
                        <SubmitButton
                          text="Apply"
                          submitting={formik.isSubmitting}
                        />
                        <ResetButton text="Clear" />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Popover.Panel>
        </div>
      )}
    </Popover>
  );
}
