import * as Yup from "yup";

import { Form, Formik, FormikHelpers } from "formik";

import { Listing } from "types/listings";
import { NumberField } from "./fields";
import { TextField } from "./fields";
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

const newListingProps: Listing = {
  photos: ["fake_url"],
  title: "",
  condition: "",
  currency: "USD",
  description: "",
  price: 0,
  domestic_shipping: 0,
  status: "draft",
};

const ListingForm: React.FC<Listing> = (props) => {
  const router = useRouter();
  const [session, loading] = useSession();

  const newListing = !props.id;

  const deleteListing = async () => {
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
    <div className="m-2 border border-blue-500">
      <h1 className="font-bold">{newListing ? "Create" : "Update"} Listing</h1>
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
        onSubmit={async (
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
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
              label="Title"
              name="title"
              type="text"
              placeholder="title"
            />

            <TextField
              label="Condition"
              name="condition"
              type="text"
              placeholder="condition"
            />

            <TextField
              label="Description"
              name="description"
              type="text"
              placeholder="description"
            />

            <NumberField label="Price" name="price" placeholder="0" />

            <NumberField
              label="Domestic Shipping"
              name="domesticShipping"
              placeholder="0"
            />

            <button
              type="submit"
              className="bg-red-900 p-2 font-bold hover:bg-red-700"
              disabled={isSubmitting}
            >
              {newListing ? "Create" : "Update"} Listing
            </button>
          </Form>
        )}
      </Formik>
      {newListing ? null : (
        <button
          className="bg-red-900 p-2 font-bold hover:bg-red-700 float-right"
          onClick={deleteListing}
        >
          Delete
        </button>
      )}
    </div>
  );
};

ListingForm.defaultProps = newListingProps;

export default ListingForm;
