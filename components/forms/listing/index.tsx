import * as Yup from "yup";

import {
  BackButton,
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
} from "./fields";
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

import FormSection from "./section";
import { IListingFormData } from "types/listings";
import { InfoMessage } from "components/message";
import Link from "next/link";
import { ListingApi } from "services/backendApi/listing";
import { MultiPictureField } from "../fields";
import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { UserSettingsContext } from "contexts/userSettings";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const schema = Yup.object().shape(listingSchema);

const subcategoryRef = createRef<HTMLSpanElement>();
const gradingCompanyRef = createRef<HTMLSpanElement>();
const conditionRef = createRef<HTMLSpanElement>();
const idPrefix = "listing-form-";

function subCategoryCombobox(formik: FormikProps<any>) {
  const category = formik.values.category;
  const placeholder = category
    ? "Select a sub-category"
    : "Select the category first";

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

const ListingForm = (props: IListingFormData): JSX.Element => {
  const router = useRouter();
  const [session, sessionLoading] = useSession();
  const [graded, setGraded] = useState(!!props.grading_company);
  const [imageData, setImageData] = useState<(File | string)[]>(
    props.photos.map((photo) => photo.url)
  );
  const { userSettings } = useContext(UserSettingsContext);
  const template = userSettings.listing_template;
  const [submittingPublish, setSubmittingPublish] = useState(false);
  const [submittingDraft, setSubmittingDraft] = useState(false);
  const [submittingDelete, setSubmittingDelete] = useState(false);

  if (sessionLoading || !template.id) return <SpinnerLg text="Loading..." />;

  for (const key in template) {
    if (template[key] == null || template[key] == undefined) {
      delete template[key];
    }
  }

  const newListing = !props.id;
  let initialValues = newListing ? { ...props, ...template } : props;
  for (const key in initialValues) {
    if (initialValues[key] === null) {
      initialValues = { ...initialValues, [key]: undefined };
    }
  }

  function renderGrading() {
    const label = graded ? "Grading" : "Condition";
    const items = graded ? gradingList : conditionList;

    return (
      <>
        {graded ? (
          <ListingDropdownCombobox
            label="Grading Company"
            description="Enter the company who graded the item. If not listed choose 'other'."
            placeholder="Select a grading company"
            name="grading_company"
            items={gradingCompanyList}
            resetRef={gradingCompanyRef}
          />
        ) : null}

        <ListingDropdownCombobox
          label={label}
          name="condition"
          description="Enter the condition for the item. See our condition guide for more information."
          placeholder="Select a condition or grading"
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
          submitting={formik.isSubmitting && submittingPublish}
          onClick={async () => {
            setSubmittingPublish(true);
            formik.setFieldValue("aasm_state", "active");
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
          submitting={formik.isSubmitting && submittingDraft}
          onClick={async () => {
            setSubmittingDraft(true);
            formik.setFieldValue("aasm_state", "draft");
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

  function renderDeleteButton(formik: FormikProps<any>, id?: number) {
    if (!id || (props.aasm_state !== "draft" && props.aasm_state !== "active"))
      return null;

    const draft = props.aasm_state === "draft";
    return (
      <DeleteButton
        text={draft ? "Delete" : "Remove"}
        disabled={formik.isSubmitting}
        submitting={submittingDelete}
        onClick={async () => {
          setSubmittingDelete(true);
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

  return (
    <div className="p-4 ">
      <PageContainer yPadding="py-2">
        <div className="absolute">
          <BackButton text="Back to listings" href="/listings?state=active" />
        </div>
        <div className="px-2">
          <h3 className="p-2 mt-8 text-center md:mt-0">
            Enter the details for your listing
          </h3>
          <InfoMessage>
            <p>
              For faster listings update your{" "}
              <Link href="/listings/template">
                <a className="underline text-info">listing template</a>
              </Link>{" "}
              or use our{" "}
              <Link href="/listings/bulkCreate">
                <a className="underline text-info">bulk upload</a>
              </Link>{" "}
              feature
            </p>
          </InfoMessage>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values: IListingFormData, actions) => {
              const formData = new FormData();
              const requestValues = (({
                category,
                subcategory,
                title,
                grading_company,
                condition,
                description,
                price,
                domestic_shipping,
                international_shipping,
                combined_shipping,
              }) => ({
                category,
                subcategory,
                title,
                grading_company,
                condition,
                description,
                price,
                domestic_shipping,
                international_shipping,
                combined_shipping,
              }))(values);
              Object.entries(requestValues).forEach(([key, value]) => {
                if (value != undefined) {
                  formData.append(key, `${value}`);
                }
              });

              const request = newListing
                ? ListingApi(session?.accessToken).create(formData, imageData)
                : ListingApi(session?.accessToken).update(
                    `${values.id}`,
                    formData,
                    imageData
                  );

              function success() {
                toast.success(
                  newListing
                    ? "New listing created"
                    : "Your listing has been updated"
                );
                router.push(
                  `/listings?state=${
                    newListing ? values.aasm_state : props.aasm_state
                  }`
                );
              }
              request
                .then((response: any) => {
                  if (values.state_transition) {
                    ListingApi(session?.accessToken)
                      .updateState(response.data.id, values.state_transition)
                      .then(() => {
                        success();
                      });
                  } else {
                    success();
                  }
                })
                .catch((error) => {
                  toast.error(error.response.data.error);
                })
                .finally(() => {
                  actions.setSubmitting(false);
                  setSubmittingDelete(false);
                  setSubmittingPublish(false);
                  setSubmittingDraft(false);
                });
            }}
          >
            {(formik) => (
              <Form>
                <FormSection header="Category">
                  <ListingDropdownCombobox
                    name="category"
                    label="Category"
                    description="Selecting a category will tailor the listing form to your needs."
                    items={categoryList}
                    placeholder="Select a category"
                    childresetRef={subcategoryRef}
                  />
                  {subCategoryCombobox(formik)}

                  <ListingTextField
                    label="Tags (Optional)"
                    name="tags"
                    id={`${idPrefix}tags`}
                    description="You can use tags to add any additional filter criteria to your listing."
                    type="text"
                    placeholder="Coming soon!"
                    disabled={true}
                  />
                </FormSection>

                <FormSection header="Details">
                  <ListingTextField
                    label="Title"
                    description="Title is the main search field for the listing. For cards, try using the format of 'Set' + 'Card Name' + 'Attributes'."
                    name="title"
                    id={`${idPrefix}title`}
                    type="text"
                    placeholder="Enter a title"
                  />
                  <ListingLongTextField
                    label="Description (Optional)"
                    name="description"
                    id={`${idPrefix}description`}
                    description="Use the description to provide any addtional detail about your listing that you want buyers to know about."
                    type="text"
                    placeholder="Write a description"
                  />
                </FormSection>

                <FormSection header="Condition">
                  <ListingToggle
                    name="graded"
                    enabled={graded}
                    setEnabled={setGraded}
                    label="Professionally Graded?"
                    description="If toggled on then you will provide the grading company and grading score."
                    onClick={async () => {
                      gradingCompanyRef.current?.click();
                      conditionRef.current?.click();
                      formik.setFieldValue("graded", !graded);
                    }}
                  />
                  {renderGrading()}
                  <a
                    href="https://support.skwirl.io/kb/en/article/how-should-i-grade-the-condition-of-my-cards"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-info"
                  >
                    Learn about our condition guidelines
                  </a>
                </FormSection>

                <FormSection header="Photos">
                  <MultiPictureField
                    label="Photos"
                    description="Add quality photos to help you sell your listing. It is usually good to have multiple photos showing the front and back of your item."
                    id={`${idPrefix}pictures`}
                    existingImageMetas={initialValues.photos}
                    imageData={imageData}
                    setImageData={setImageData}
                  />
                </FormSection>

                <FormSection header="Price and Shipping">
                  <ListingNumberField
                    label="Price"
                    name="price"
                    id={`${idPrefix}price`}
                    description="Enter the price. Lower prices will increase your chances of making a sale."
                    placeholder="0"
                    currency={userSettings.currency}
                  />

                  <ListingNumberField
                    label="Domestic Shipping"
                    name="domestic_shipping"
                    id={`${idPrefix}domestic_shipping`}
                    description="Enter the price for domestic shipping. Enter 0 for free shipping."
                    placeholder="Enter domestic shipping price"
                    currency={userSettings.currency}
                  />

                  <ListingNumberField
                    label="International Shipping (Optional)"
                    name="international_shipping"
                    id={`${idPrefix}international_shipping`}
                    description="Leave blank if you do not offer international shipping. Enter 0 for free international shipping."
                    placeholder="No international shipping"
                    currency={userSettings.currency}
                  />

                  <ListingNumberField
                    label="Combined Shipping (Optional)"
                    name="combined_shipping"
                    id={`${idPrefix}combined_shipping`}
                    description="Enter the amount to charge for each additional item purchased in a single order after the first. Leave blank if you do not offer combined shipping."
                    placeholder="No combined shipping"
                    currency={userSettings.currency}
                  />
                </FormSection>
                {renderUpdateButtons(formik)}
                {renderDeleteButton(formik, props.id)}
              </Form>
            )}
          </Formik>
        </div>
      </PageContainer>
    </div>
  );
};

export const ListingFormDefaultProps: IListingFormData = {
  category: "",
  subcategory: "",
  photos: [],
  title: "",
  grading_company: "",
  condition: "",
  description: "",
  price: "",
  domestic_shipping: "",
  international_shipping: "",
  combined_shipping: "",
  aasm_state: "draft",
};

export default ListingForm;
