import * as Yup from "yup";

import {
  ComboBoxOption,
  DropdownCombobox,
  LongTextField,
  NumberField,
  TextField,
  Toggle,
} from "./fields";
import { DeleteButton, SecondarySubmitButton, SubmitButton } from "components/buttons";
import { Form, Formik, FormikProps } from "formik";
import {
  conditionList,
  gradingCompanyList,
  gradingList,
} from "constants/listings";
import { createRef, useState } from "react";

import FormSection from "./section";
import { Listing } from "types/listings";
import { ListingApi } from "services/backendApi/listing";
import _ from "lodash";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

//Listing Schema
const listingSchema = Yup.object().shape({
  photos: Yup.array(Yup.string()).min(1).max(10),
  title: Yup.string()
    .min(2, "Title must be more than 2 characters")
    .max(256, "Title must be less than 256 characters")
    .required("Title is required"),
  grading_company: Yup.mixed().oneOf(
    gradingCompanyList.map((gradingCompany) => {
      return gradingCompany.value;
    }),
    "This is not a valid grading company"
  ),
  condition: Yup.mixed()
    .when("grading_company", {
      is: "",
      then: Yup.mixed().oneOf(
        conditionList.map((condition) => {
          return condition.value;
        }),
        "This is not a valid condition"
      ),
      otherwise: Yup.mixed().oneOf(
        gradingList.map((grading) => {
          return grading.value;
        }),
        "This is not a valid grading"
      ),
    })
    .required("Condition is required"),
  price: Yup.number()
    .min(0.25, "Price must more than 0.25")
    .max(99999999.99, "Price must be less than 99999999.99")
    .required("Price is required"),
  domestic_shipping: Yup.number()
    .min(0, "Shipping can't be less than 0")
    .max(99999999.99, "Shipping must be less than 99999999.99")
    .required("Shipping price is required"),
  status: Yup.string().required("Required"),
});

// Stub photos while waiting for S3 integration
const stubPhotos = [
  "/images/picture-1.jpg",
  "/images/picture-2.jpg",
  "/images/picture-3.jpg",
  "/images/picture-4.jpg",
  "/images/picture-5.jpg",
];

// Pick random photo from library
const randomPhotos = _.sampleSize(
  stubPhotos,
  Math.floor(Math.random() * stubPhotos.length)
);

// Defaults for new listing
const newListingProps: Listing = {
  category: "",
  subcategory: "",
  photos: randomPhotos,
  title: "",
  condition: "",
  description: "",
  price: 0,
  domestic_shipping: 0,
  status: "ACTIVE",
};

const categoryList = [
  { value: "SPORTS_CARDS", text: "Sports Cards" },
  { value: "TRADING_CARDS", text: "Trading Card Games" },
  { value: "COLLECTIBLES", text: "Collectibles" },
];

const sportsCardList = [
  { value: "BASEBALL", text: "Baseball" },
  { value: "BASKETBALL", text: "Basketball" },
  { value: "FOOTBALL", text: "Football" },
  { value: "HOCKEY", text: "Hockey" },
  { value: "SOCCER", text: "Soccer" },
  { value: "OTHER", text: "Other" },
];

const tradingCardList = [
  { value: "CARDFIGHT_VANGUARD", text: "Cardfight Vanguard" },
  { value: "DRAGON_BALL_SUPER", text: "Dragon Ball Super" },
  { value: "FLESH_AND_BLOOD", text: "Flesh and Blood" },
  { value: "MAGIC", text: "Magic The Gathering" },
  { value: "POKEMON", text: "Pokemon" },
  { value: "STAR_WARS_DESTINY", text: "Star Wars Destiny" },
  { value: "YUGIOH", text: "Yu-gi-oh!" },
  { value: "OTHER", text: "Other" },
];

const collectibleList = [
  { value: "ANTIQUES", text: "Antiques" },
  { value: "ART", text: "Art" },
  { value: "COINS", text: "Coins" },
  { value: "COMIC", text: "Comic Books" },
  { value: "STAMPS", text: "Stamps" },
  { value: "TOYS", text: "Toys" },
  { value: "WATCHES", text: "Watches" },
  { value: "OTHER", text: "Other" },
];

const subcategoryRef = createRef<HTMLSpanElement>();
const gradingCompanyRef = createRef<HTMLSpanElement>();
const conditionRef = createRef<HTMLSpanElement>();

function subCategoryCombobox(formik: FormikProps<any>) {
  const category = formik.values.category;
  const placeholder = category
    ? "Select a sub-category"
    : "Select category first";

  var items: ComboBoxOption[] = [];
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
      label="Sub-Category"
      name="subcategory"
      items={items}
      formik={formik}
      placeholder={placeholder}
      disabled={!category}
      resetRef={subcategoryRef}
    />
  );
}

const ListingForm = (props: Listing) => {
  const router = useRouter();
  const [session] = useSession();
  const [graded, setGraded] = useState(false);

  const newListing = !props.id;

  if (!session) return <div>Spinner</div>;

  function renderGrading(formik: FormikProps<any>) {
    const label = graded ? "Grading" : "Condition";
    const items = graded ? gradingList : conditionList;

    return (
      <>
        <DropdownCombobox
          label="Grading Company"
          name="grading_company"
          items={gradingCompanyList}
          formik={formik}
          resetRef={gradingCompanyRef}
          hidden={!graded}
        />

        <DropdownCombobox
          label={label}
          name="condition"
          items={items}
          formik={formik}
          resetRef={conditionRef}
        />
      </>
    );
  }

  function renderDeleteButton(id: string | undefined, accessToken: string) {
    if (!id || !accessToken) return null;
    return (
      <DeleteButton
        text="Delete"
        onClick={async () => {
          await ListingApi(accessToken)
            .destroy(id)
            .then((_) => {
              toast.error("Your listing has been deleted");
              router.push("/listings");
            })
            .catch((error) => {
              console.log(error);
              alert(error.response.data.error);
            });
        }}
      />
    );
  }

  return (
    <div className="m-4">
      <h3>Enter the details for your listing</h3>
      <Formik
        initialValues={{
          id: props.id,
          category: props.category,
          subcategory: props.subcategory,
          photos: props.photos,
          title: props.title,
          condition: props.condition,
          description: props.description,
          price: props.price,
          domestic_shipping: props.domestic_shipping,
          status: props.status,
        }}
        validationSchema={listingSchema}
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
              router.push("/listings?status=active");
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
              <DropdownCombobox
                name="category"
                label="Category"
                items={categoryList}
                formik={formik}
                placeholder="Select a category"
                childresetRef={subcategoryRef}
              />

              {subCategoryCombobox(formik)}

              <TextField
                label="Tags"
                name="tags"
                type="text"
                placeholder="pending"
                disabled={true}
              />
            </FormSection>

            <FormSection header="Details">
              <TextField
                label="Title"
                name="title"
                type="text"
                placeholder="title"
              />
              <LongTextField
                label="Description"
                name="description"
                type="text"
                placeholder="description"
              />
            </FormSection>

            <FormSection header="Condition">
              <Toggle
                enabled={graded}
                setEnabled={setGraded}
                label="Professionally Graded?"
                description="Some helper text on what this means"
                onClick={async () => {
                  gradingCompanyRef?.current?.click();
                  conditionRef?.current?.click();
                }}
              />
              {renderGrading(formik)}
            </FormSection>

            <FormSection header="Photos">stub</FormSection>

            <FormSection header="Price and Shipping">
              <NumberField label="Price" name="price" placeholder="0" />

              <NumberField
                label="Domestic Shipping"
                name="domestic_shipping"
                placeholder="0"
              />
            </FormSection>
            <div className="space-x-2">
              <SubmitButton
                text={(newListing ? "Publish" : "Update") + " Listing"}
                disabled={formik.isSubmitting}
                onClick={async () => {
                  formik.values.status = "ACTIVE";
                }}
              />

              {newListing ? (
                <SecondarySubmitButton
                  text="Save Draft"
                  disabled={formik.isSubmitting}
                  onClick={async () => {
                    formik.values.status = "DRAFT";
                  }}
                />
              ) : null}
            </div>
          </Form>
        )}
      </Formik>
      {renderDeleteButton(props.id, session.accessToken)}
    </div>
  );
};

ListingForm.defaultProps = newListingProps;

export default ListingForm;
