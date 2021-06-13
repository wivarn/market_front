import * as Yup from "yup";

import {
  ComboBoxOption,
  DropdownCombobox,
  LongTextField,
  NumberField,
  SelectBox,
  TextField,
} from "./fields";
import { DeleteButton, SubmitButton } from "components/buttons";
import { Form, Formik, FormikProps } from "formik";

import FormSection from "./section";
import { Listing } from "types/listings";
import { ListingApi } from "services/backendApi/listing";
import _ from "lodash";
import { condition } from "constants/listings";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const listingSchema = Yup.object().shape({
  photos: Yup.array(Yup.string()).min(1).max(10),
  title: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(256, "Must be at most 256 characters")
    .required("Required"),
  condition: Yup.mixed()
    .oneOf(Object.keys(condition), "invalid condtion")
    .required("Required"),
  description: Yup.string()
    .min(5, "Must be at least 5 characters")
    .required("Required"),
  price: Yup.number()
    .min(0.25, "Must be at least 0.25")
    .max(99999999.99, "Must be at most 99999999.99")
    .required("Required"),
  domestic_shipping: Yup.number()
    .min(0, "Must be at least 0")
    .max(99999999.99, "Must be at most 99999999.99")
    .required("Required"),
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

const newListingProps: Listing = {
  category: "",
  subcategory: "",
  photos: randomPhotos,
  title: "",
  condition: "NEAR_MINT",
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

function subCategoryCombobox(formik: FormikProps<any>) {
  const category = formik.getFieldProps("category").value;
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
    />
  );
}

const ListingForm = (props: Listing) => {
  const router = useRouter();
  const [session] = useSession();

  const newListing = !props.id;

  if (!session) return <div>Spinner</div>;

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
    <div className="p-4">
      <h2>Enter the details of your listing</h2>
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
              <SelectBox
                label="Condition"
                name="condition"
                options={condition}
              />
              <LongTextField
                label="Description"
                name="description"
                type="text"
                placeholder="description"
              />
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

            <SubmitButton
              text={(newListing ? "Publish" : "Update") + " Listing"}
              disabled={formik.isSubmitting}
              onClick={async () => {
                formik.values.status = "ACTIVE";
              }}
            />

            {newListing ? (
              <SubmitButton
                text="Save Draft"
                disabled={formik.isSubmitting}
                onClick={async () => {
                  formik.values.status = "DRAFT";
                }}
              />
            ) : null}
          </Form>
        )}
      </Formik>
      {renderDeleteButton(props.id, session.accessToken)}
    </div>
  );
};

ListingForm.defaultProps = newListingProps;

export default ListingForm;
