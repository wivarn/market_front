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
  const [graded, setGraded] = useState(false);

  function renderGrading() {
    const label = graded ? "Grading" : "Condition";
    const items = graded ? gradingList : conditionList;

    return (
      <>
        <ListingDropdownCombobox
          label="Graded by"
          name="grading_company"
          items={gradingCompanyList}
          resetRef={gradingCompanyRef}
          hidden={!graded}
        />

        <ListingDropdownCombobox
          label={label}
          name="condition"
          items={items}
          resetRef={conditionRef}
        />
      </>
    );
  }

  if (!router.isReady) return <div>Spinner</div>;

  return (
    <FormContainer>
      <h4>Select Filters</h4>

      <Formik
        initialValues={{
          gt: null,
          lt: null,
          category: null,
          subcategory: null,
          graded: null,
          grading_comany: null,
          condition: null,
        }}
        // validationSchema={profileSchema}
        onSubmit={(values, actions) => {
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
            <NumberField name="gt" placeholder="Low" />
            <NumberField name="lt" placeholder="High" />

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
            <ResetButton text="Clear" />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
