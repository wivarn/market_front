import * as Yup from "yup";

import {
  DeleteButton,
  SecondarySubmitButton,
  SubmitButton,
} from "components/buttons";
import { Form, Formik, FormikProps } from "formik";
import {
  ListingComboBoxOption,
  ListingDropdownCombobox,
  ListingLongTextField,
  ListingNumberField,
  ListingTextField,
  ListingToggle,
} from "../listing/fields";
import {
  categoryList,
  collectibleList,
  conditionList,
  gradingCompanyList,
  gradingList,
  listingSchema,
  sportsCardList,
  tradingCardList,
} from "constants/listings";
import { createRef, useState } from "react";

import { CardContainer6xl } from "components/cardContainer";
import FormSection from "./section";
import { Listing } from "types/listings";
import { ListingApi } from "services/backendApi/listing";
import { SpinnerLg } from "components/spinner";
import _ from "lodash";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/client";

// Stub photos while waiting for S3 integration
const stubPhotos = [
  "/images/picture-1.jpg",
  "/images/picture-2.jpg",
  "/images/picture-3.jpg",
  "/images/picture-4.jpg",
  "/images/picture-5.jpg",
];

// Pick random photo from library
const randomPhotos = () =>
  _.sampleSize(stubPhotos, Math.floor(Math.random() * stubPhotos.length));

const schema = Yup.object().shape(listingSchema);

const subcategoryRef = createRef<HTMLSpanElement>();
const gradingCompanyRef = createRef<HTMLSpanElement>();
const conditionRef = createRef<HTMLSpanElement>();
const idPrefix = "listing-form-";

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

const ListingForm = (props: Listing): JSX.Element => {
  const router = useRouter();
  const [session] = useSession();
  const [graded, setGraded] = useState(!!props.grading_company);

  const newListing = !props.id;

  function renderGrading() {
    const label = graded ? "Grading" : "Condition";
    const items = graded ? gradingList : conditionList;

    return (
      <>
        {graded ? (
          <ListingDropdownCombobox
            label="Grading Company"
            description="Enter the company who graded the item. If not listed choose 'other'."
            name="grading_company"
            items={gradingCompanyList}
            resetRef={gradingCompanyRef}
          />
        ) : null}

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

  function renderUpdateButtons(formik: FormikProps<any>) {
    if (
      formik.values.aasm_state !== "draft" &&
      formik.values.aasm_state !== "active" &&
      formik.values.aasm_state !== "removed"
    )
      return null;
    const draft = newListing || formik.values.aasm_state === "draft";
    const removed = formik.values.aasm_state === "removed";

    function renderPublishButton(formik: FormikProps<any>) {
      return (
        <SubmitButton
          text={(draft || removed ? "Publish" : "Update") + " Listing"}
          disabled={formik.isSubmitting}
          onClick={async () => {
            formik.setFieldValue("state", "active");
            if (draft || removed)
              formik.setFieldValue("state_transition", "publish");
          }}
        />
      );
    }

    function renderDraftButton(formik: FormikProps<any>) {
      if (!draft) return null;
      return (
        <SecondarySubmitButton
          text={(newListing ? "Save" : "Update") + " Draft"}
          disabled={formik.isSubmitting}
          onClick={async () => {
            formik.setFieldValue("state", "draft");
          }}
        />
      );
    }

    return (
      <div className="space-x-2">
        {renderPublishButton(formik)}
        {renderDraftButton(formik)}
      </div>
    );
  }

  function renderDeleteButton(id: string | undefined) {
    if (!id || (props.aasm_state !== "draft" && props.aasm_state !== "active"))
      return null;

    const draft = props.aasm_state === "draft";
    return (
      <DeleteButton
        text={draft ? "Delete" : "Remove"}
        onClick={async () => {
          if (draft) {
            await ListingApi(session?.accessToken)
              .destroy(id)
              .then(() => {
                toast.success("Your listing has been deleted");
                router.push("/listings?state=active");
              })
              .catch((error) => {
                toast.error(error.response.data.error);
              });
          } else {
            await ListingApi(session?.accessToken)
              .updateState(id, "remove")
              .then(() => {
                toast.success("Your listing has been removed");
                router.push("/listings?state=active");
              })
              .catch((error) => {
                toast.error(error.response.data.error);
              });
          }
        }}
      />
    );
  }

  function getProfile() {
    const { data, error } = useSWR(
      session ? ["account/profile", session.accessToken] : null
    );

    return {
      profile: data,
      isLoading: !error && !data,
      profileError: error,
    };
  }

  function getListingTemplate() {
    const { data, error } = useSWR(
      session ? ["account/listing_template", session.accessToken] : null
    );

    return {
      template: data,
      loadingTemplate: !error && !data,
      templateError: error,
    };
  }

  const profile = getProfile().profile?.data;
  const template = getListingTemplate().template?.data;

  if (!session || !template) return <SpinnerLg text="Loading..." />;

  for (const key in template) {
    if (template[key] === null || template[key] === undefined) {
      delete template[key];
    }
  }

  const initialValues = newListing ? { ...props, ...template } : props;

  return (
    <div className="p-4">
      <CardContainer6xl>
        <div className="p-2">
          <h3 className="p-2 text-center">
            Enter the details for your listing
          </h3>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values: Listing, actions) => {
              const request = newListing
                ? ListingApi(session.accessToken).create(values)
                : ListingApi(session.accessToken).update(values);

              request
                .then(() => {
                  toast.success(
                    newListing
                      ? "New listing created!"
                      : "Your listing has been updated"
                  );
                  router.push("/listings?state=active");
                })
                .catch((error) => {
                  toast.error(error.response.data.error);
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
                    id={`${idPrefix}tags`}
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
                    id={`${idPrefix}title`}
                    type="text"
                    placeholder="title"
                  />
                  <ListingLongTextField
                    label="Description"
                    name="description"
                    id={`${idPrefix}description`}
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

                <FormSection header="Photos">stub</FormSection>

                <FormSection header="Price and Shipping">
                  <ListingNumberField
                    label="Price"
                    name="price"
                    id={`${idPrefix}price`}
                    description="Enter the price. Lower prices will increase your chances of making a sale."
                    placeholder="0"
                    currency={profile?.currency}
                  />

                  <ListingNumberField
                    label="Domestic Shipping"
                    name="domestic_shipping"
                    id={`${idPrefix}domestic_shipping`}
                    description="Enter the price for domestic shipping. Enter 0 for free shipping."
                    placeholder="Enter domestic shipping price."
                    currency={profile?.currency}
                  />

                  <ListingNumberField
                    label="International Shipping"
                    name="international_shipping"
                    id={`${idPrefix}international_shipping`}
                    description="Leave blank if you do not offer international shipping. Enter 0 for free shipping."
                    placeholder="No international shipping"
                    currency={profile?.currency}
                  />

                  <ListingNumberField
                    label="Combined Shipping"
                    name="combined_shipping"
                    id={`${idPrefix}combined_shipping`}
                    description="Leave blank if you do not offer combined shipping. Enter 0 no additional shipping fee after the first item in an order."
                    placeholder="No combined shipping"
                    currency={profile?.currency}
                  />
                </FormSection>
                {renderUpdateButtons(formik)}
              </Form>
            )}
          </Formik>
          {renderDeleteButton(props.id)}
        </div>
      </CardContainer6xl>
    </div>
  );
};

ListingForm.defaultProps = {
  category: "",
  subcategory: "",
  photos: randomPhotos(),
  title: "",
  grading_company: "",
  condition: "",
  description: "",
  price: "",
  domestic_shipping: "",
  international_shipping: undefined,
  combined_shipping: undefined,
  aasm_state: "draft",
  state_transition: undefined,
};

export default ListingForm;
