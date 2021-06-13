import * as Yup from "yup";

import { DeleteButton, SubmitButton } from "components/buttons";
import { Form, Formik } from "formik";
import { LongTextField, NumberField, SelectBox, TextField } from "./fields";
import _, { values } from "lodash";

import FormSection from "./section";
import { Listing } from "types/listings";
import { ListingApi } from "services/backendApi/listing";
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
  category: "TRADING_CARDS",
  subcategory: "MAGIC",
  photos: randomPhotos,
  title: "",
  condition: "NEAR_MINT",
  description: "",
  price: 0,
  domestic_shipping: 0,
  status: "ACTIVE",
};

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
    <>
      <h2 className="mt-8">Enter the details of your listing</h2>
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
        onSubmit={async (values: Listing, actions) => {
          const request = newListing
            ? ListingApi(session.accessToken).create(values)
            : ListingApi(session.accessToken).update(values);

          request
            .then((_) => {
              toast.success(
                newListing
                  ? "New listing created!"
                  : "Your listing has been updated"
              );
              router.push("/listings");
            })
            .catch((error) => {
              toast.error(JSON.stringify(error.response.data));
            });
        }}
      >
        {(formik) => (
          <Form>
            <FormSection header="Category">
              <TextField name="category" type="text" hidden={true} />

              <TextField name="subcategory" type="text" hidden={true} />
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
    </>
  );
};

ListingForm.defaultProps = newListingProps;

export default ListingForm;
