import * as Yup from "yup";

import { DeleteButton, SubmitButton } from "components/buttons";
import { Form, Formik, FormikHelpers } from "formik";

import FormContainer from "./container";
import { Listing } from "types/listings";
import { NumberField } from "./fields";
import { TextField } from "./fields";
import _ from "lodash";
import api from "services/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

interface Values {
  photos: string[];
  title: string;
  condition: string;
  currency: string;
  description?: string;
  price: number | string;
  domesticShipping: number | string;
  status?: string;
}

const listingSchema = Yup.object().shape({
  photos: Yup.array(Yup.string()).min(1).max(10),
  title: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(256, "Must be at most 256 characters")
    .required("Required"),
  condition: Yup.string().required("Required"),
  currency: Yup.string().required("Required"),
  description: Yup.string()
    .min(5, "Must be at least 5 characters")
    .required("Required"),
  price: Yup.number()
    .positive()
    .max(999999, "Must be at most 999999")
    .required("Required"),
  domesticShipping: Yup.number()
    .min(0, "Must be at least 0")
    .max(999999, "Must be at most 999999")
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
  photos: randomPhotos,
  title: "",
  condition: "",
  currency: "USD",
  description: "",
  price: 0,
  domestic_shipping: 0,
  status: "draft",
};

const ListingForm = (props: Listing) => {
  const router = useRouter();
  const [session] = useSession();

  const newListing = !props.id;

  const deleteListing: () => Promise<void> = async () => {
    await api
      .delete(`listings/${props.id}`, {
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      })
      .then((_) => {
        router.push("/listings");
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.error);
      });
  };

  return (
    <FormContainer>
      <h2>{newListing ? "Create" : "Update"} Listing</h2>
      <Formik
        initialValues={{
          photos: props.photos,
          title: props.title,
          condition: props.condition,
          currency: props.currency,
          description: props.description,
          price: props.price,
          domesticShipping: props.domestic_shipping,
          status: props.status,
        }}
        validationSchema={listingSchema}
        onSubmit={async (values: Values) => {
          await api
            .post(
              `listings${newListing ? "" : `/${props.id}`}`,
              {
                listing: {
                  photos: values.photos,
                  title: values.title,
                  condition: values.condition,
                  currency: values.currency,
                  description: values.description,
                  price: values.price,
                  domestic_shipping: values.domesticShipping,
                  status: values.status,
                },
              },
              {
                headers: { Authorization: `Bearer ${session?.accessToken}` },
              }
            )
            .then((_) => {
              router.push("/listings");
            })
            .catch((error) => {
              console.log(error);
              alert(error.response.data.error);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextField
              label="Title: "
              name="title"
              type="text"
              placeholder="title"
            />

            <TextField
              label="Condition: "
              name="condition"
              type="text"
              placeholder="condition"
            />

            <TextField
              label="Description: "
              name="description"
              type="text"
              placeholder="description"
            />

            <NumberField label="Price: " name="price" placeholder="0" />

            <NumberField
              label="Domestic Shipping: "
              name="domesticShipping"
              placeholder="0"
            />

            <SubmitButton
              text={(newListing ? "Save" : "Update") + " Listing"}
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
      {newListing ? null : (
        <DeleteButton text="Delete" onClick={deleteListing} />
      )}
    </FormContainer>
  );
};

ListingForm.defaultProps = newListingProps;

export default ListingForm;
