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

const listingSchema = Yup.object().shape({
  category: Yup.mixed()
    .oneOf(
      categoryList.map((category) => {
        return category.value;
      })
    )
    .required("Category is required"),
  subCategory: Yup.mixed()
    .when("category", {
      is: "SPORTS_CARDS",
      then: Yup.mixed().oneOf(
        sportsCardList.map((sports_card) => {
          return sports_card.value;
        })
      ),
    })
    .when("category", {
      is: "TRADING_CARDS",
      then: Yup.mixed().oneOf(
        tradingCardList.map((trading_card) => {
          return trading_card.value;
        })
      ),
    })
    .when("category", {
      is: "COLLECTIBLES",
      then: Yup.mixed().oneOf(
        collectibleList.map((collectible) => {
          return collectible.value;
        })
      ),
    })
    .required("Sub-category is required"),
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

const ListingForm = (props: Listing): JSX.Element => {
  const router = useRouter();
  const [session] = useSession();
  const [graded, setGraded] = useState(false);

  const newListing = !props.id;

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

  function renderDeleteButton(id: string | undefined, accessToken: string) {
    if (!id || !accessToken) return null;
    return (
      <DeleteButton
        text="Delete"
        onClick={async () => {
          await ListingApi(accessToken)
            .destroy(id)
            .then(() => {
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

  const { profile } = getProfile();

  if (!session) return <div>Spinner</div>;

  return (
    <div className="max-w-6xl p-4 mx-auto mt-4">
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
                enabled={graded}
                setEnabled={setGraded}
                label="Professionally Graded?"
                description="If turned on then you will need to provide the grading company and grading score."
                onClick={async () => {
                  gradingCompanyRef?.current?.click();
                  conditionRef?.current?.click();
                }}
              />
              {renderGrading()}
            </FormSection>

            <FormSection header="Photos">stub</FormSection>

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
