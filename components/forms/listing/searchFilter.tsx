import * as Yup from "yup";

import { Form, Formik, FormikProps } from "formik";
import {
  ListingComboBoxOption,
  ListingDropdownCombobox,
  ListingToggle,
} from "./fields";
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

import FormContainer from "../container";
import { NumberField } from "../fields";
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
      conditionList
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
    <ListingDropdownCombobox
      label="Sub-Category"
      name="subcategory"
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

  function renderGrading() {
    const label = graded ? "Minimum Grading" : "Minimum Condition";
    const items = graded ? gradingList : conditionList;

    return (
      <>
        {graded ? (
          <ListingDropdownCombobox
            label="Graded by"
            name="grading_company"
            items={gradingCompanyList}
            resetRef={gradingCompanyRef}
            hidden={!graded}
          />
        ) : null}

        <ListingDropdownCombobox
          label={label}
          name="min_condition"
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
  };

  const params = new URLSearchParams(router.asPath.split("?")[1]);
  for (const key in initialValues) {
    initialValues[key] = params.get(key) || "";
  }

  return (
    <FormContainer>
      <h4>Select Filters</h4>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={filterSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          router.push({
            pathname: "/listings/search",
            query: { ...router.query, ...values },
          });
          actions.setSubmitting(false);
        }}
      >
        {(formik) => (
          <Form>
            <label>Price</label>
            <NumberField name="min_price" placeholder="Min" />
            <NumberField name="max_price" placeholder="Max" />

            <ListingDropdownCombobox
              name="category"
              label="Category"
              items={categoryList}
              placeholder="Select a category"
              childresetRef={subcategoryRef}
            />
            {subCategoryCombobox(formik)}

            <ListingToggle
              name="graded"
              enabled={graded}
              setEnabled={setGraded}
              label="Graded?"
              onClick={async () => {
                gradingCompanyRef.current?.click();
                conditionRef.current?.click();
                formik.setFieldValue("graded", !graded);
              }}
            />
            {renderGrading()}

            <SubmitButton text="Apply" disabled={formik.isSubmitting} />
            <ResetButton
              text="Clear"
              onClick={async () => {
                router.push("/listings/search");
              }}
            />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
