import * as Yup from "yup";

import { Form, Formik, FormikProps } from "formik";
import {
  ListingComboBoxOption,
  ListingDropdownCombobox,
  ListingLongTextField,
  ListingNumberField,
  ListingTextField,
  ListingToggle,
} from "./fields";
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
import useSWR, { mutate } from "swr";

import { BackButton } from "components/buttons";
import { CardContainer6xl } from "components/cardContainer";
import FormSection from "./section";
import { ListingTemplate } from "types/listings";
import { ListingTemplateApi } from "services/backendApi/listingTemplate";
import { SpinnerLg } from "components/spinner";
import { SubmitButton } from "components/buttons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const listingSchema = Yup.object().shape({
  category: Yup.mixed().oneOf(
    categoryList
      .map((category): string | null => {
        return category.value;
      })
      .concat(null)
  ),
  subcategory: Yup.mixed()
    .when("category", {
      is: "SPORTS_CARDS",
      then: Yup.mixed().oneOf(
        sportsCardList
          .map((sports_card): string | null => {
            return sports_card.value;
          })
          .concat(null)
      ),
    })
    .when("category", {
      is: "TRADING_CARDS",
      then: Yup.mixed().oneOf(
        tradingCardList
          .map((trading_card): string | null => {
            return trading_card.value;
          })
          .concat(null)
      ),
    })
    .when("category", {
      is: "COLLECTIBLES",
      then: Yup.mixed().oneOf(
        collectibleList
          .map((collectible): string | null => {
            return collectible.value;
          })
          .concat(null)
      ),
    })
    .nullable(),
  title: Yup.string()
    .min(2, "Title must be more than 2 characters")
    .max(256, "Title must be less than 256 characters")
    .nullable(),
  grading_company: Yup.mixed()
    .when("graded", {
      is: true,
      then: Yup.mixed().oneOf(
        gradingCompanyList
          .map((gradingCompany): string | null => {
            return gradingCompany.value;
          })
          .concat(null),
        "This is not a valid grading company"
      ),
    })
    .nullable(),
  condition: Yup.mixed()
    .when("grading_company", {
      is: "",
      then: Yup.mixed().oneOf(
        conditionList
          .map((condition): string | null => {
            return condition.value;
          })
          .concat(null),
        "This is not a valid condition"
      ),
      otherwise: Yup.mixed().oneOf(
        gradingList
          .map((grading): string | null => {
            return grading.value;
          })
          .concat(null),
        "This is not a valid grading"
      ),
    })
    .nullable(),
  price: Yup.number()
    .min(0.25, "Price must more than 0.25")
    .max(99999999.99, "Price must be less than 99999999.99")
    .nullable(),
  domestic_shipping: Yup.number()
    .min(0, "Shipping can't be less than 0")
    .max(99999999.99, "Shipping must be less than 99999999.99")
    .nullable(),
  international_shipping: Yup.number()
    .min(0, "Shipping can't be less than 0")
    .max(99999999.99, "Shipping must be less than 99999999.99")
    .nullable(),
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
      description="The sub-category will make it easy for other users to browse and find your listing."
      name="subcategory"
      items={items}
      placeholder={placeholder}
      disabled={!category}
      resetRef={subcategoryRef}
    />
  );
}

const ListingTemplateForm = (props: ListingTemplate): JSX.Element => {
  const [session] = useSession();
  const [graded, setGraded] = useState(false);
  const router = useRouter();

  function getProfile() {
    const { data, error } = useSWR(
      session ? ["account/profile", session.accessToken] : null
    );

    return {
      profile: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  function renderGrading() {
    const label = graded ? "Grading" : "Condition";
    const items = graded ? gradingList : conditionList;

    return (
      <>
        <ListingDropdownCombobox
          label="Grading Company"
          description="Enter the company who graded the item. If not listed choose 'other'."
          name="grading_company"
          items={gradingCompanyList}
          resetRef={gradingCompanyRef}
          hidden={!graded}
        />

        <ListingDropdownCombobox
          label={label}
          name="condition"
          description="Enter the condition for the item. See our grading guide for more information."
          items={items}
          resetRef={conditionRef}
        />
      </>
    );
  }

  const { profile } = getProfile();

  if (!session) return <SpinnerLg text="Loading..." />;

  return (
    <div className="relative p-4">
      <CardContainer6xl>
        <div className="absolute -top-8">
          <BackButton text="Back to listings" href="/listings?state=active" />
        </div>
        <div className="p-2">
          <h3 className="p-2 text-center">
            Enter the details for your listing template
          </h3>
          <Formik
            initialValues={{
              category: props.category || "",
              subcategory: props.subcategory || "",
              title: props.title || "",
              graded: false,
              grading_company: props.grading_company || "",
              condition: props.condition || "",
              description: props.description || "",
              price: props.price || "",
              domestic_shipping: props.domestic_shipping || "",
              international_shipping: props.international_shipping || "",
            }}
            validationSchema={listingSchema}
            onSubmit={(values: ListingTemplate, actions) => {
              Object.keys(values).forEach((key) => {
                if (values[key] == "") {
                  values[key] = undefined;
                }
              });
              ListingTemplateApi(session.accessToken)
                .update(values)
                .then(() => {
                  mutate(["account/listing_template", session?.accessToken]);
                  toast.success("Your listing template has been updated");
                  router.push("/listings?state=active");
                })
                .catch((error) => {
                  toast.error(JSON.stringify(error.response.data));
                })
                .finally(() => {
                  actions.setSubmitting(false);
                });
            }}
          >
            {(formik) => (
              <Form>
                <FormSection header="Category">
                  <ListingDropdownCombobox
                    name="category"
                    label="Category"
                    description="Selecting a category will allow us to tailor the listing form for your needs."
                    items={categoryList}
                    placeholder="Select a category"
                    childresetRef={subcategoryRef}
                  />
                  {subCategoryCombobox(formik)}

                  <ListingTextField
                    label="Tags"
                    name="tags"
                    description="You can use tags to add any additional filter criteria to your listing."
                    type="text"
                    placeholder="pending"
                    disabled={true}
                  />
                </FormSection>

                <FormSection header="Details">
                  <ListingTextField
                    label="Title"
                    description="Title is the main search field for the listing. Try using the format of 'Set' + 'Card Name' + 'Attributes'."
                    name="title"
                    type="text"
                    placeholder="title"
                  />
                  <ListingLongTextField
                    label="Description"
                    name="description"
                    description="Use the description to provide any detail about your listing that you want buyers to know about."
                    type="text"
                    placeholder="description"
                  />
                </FormSection>

                <FormSection header="Condition">
                  <ListingToggle
                    name="graded"
                    enabled={graded}
                    setEnabled={setGraded}
                    label="Professionally Graded?"
                    description="If turned on then you will need to provide the grading company and grading score."
                    onClick={async () => {
                      gradingCompanyRef.current?.click();
                      conditionRef.current?.click();
                      formik.setFieldValue("graded", !graded);
                    }}
                  />
                  {renderGrading()}
                </FormSection>

                <FormSection header="Price and Shipping">
                  <ListingNumberField
                    label="Price"
                    name="price"
                    description="Enter the price. Lower prices will increase your chances of making a sale."
                    placeholder="0"
                    currency={profile?.data?.currency}
                  />

                  <ListingNumberField
                    label="Domestic Shipping"
                    name="domestic_shipping"
                    description="Enter the price for domestic shipping."
                    placeholder="0"
                    currency={profile?.data?.currency}
                  />

                  <ListingNumberField
                    label="International Shipping"
                    name="international_shipping"
                    description="Enter the price for international shipping."
                    placeholder="0"
                    currency={profile?.data?.currency}
                  />
                </FormSection>
                <div className="space-x-2">
                  <SubmitButton
                    text="Update template"
                    disabled={formik.isSubmitting}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </CardContainer6xl>
    </div>
  );
};

export default ListingTemplateForm;
