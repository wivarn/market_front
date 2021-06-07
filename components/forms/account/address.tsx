import * as Yup from "yup";

import { Form, Formik } from "formik";

import { AddressApi } from "services/backendApi/address";
import FormContainer from "../container";
import { SubmitButton } from "components/buttons";
import { TextField } from "../fields";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useSession } from "next-auth/client";

const addressSchema = Yup.object().shape({
  street1: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Required"),
  street2: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters"),
  city: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Required"),
  state: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Required"),
  zip: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Required"),
  country: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Required"),
});

export default function AddressForm() {
  const [session, loading] = useSession();

  function getAddresses() {
    const { data, error } = useSWR(
      session ? ["account/address", session.accessToken] : null
    );

    return {
      addresses: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const { addresses, isLoading, isError } = getAddresses();

  if (isLoading || loading) return <div>Spinner</div>;
  if (isError) return <div>Error</div>;

  const address = addresses.data[0] || {};

  return (
    <FormContainer>
      <Formik
        initialValues={{
          street1: address.street1 || "",
          street2: address.street2 || "",
          city: address.city || "",
          state: address.state || "",
          zip: address.zip || "",
          country: address.country || "",
        }}
        validationSchema={addressSchema}
        onSubmit={async (values) => {
          AddressApi(session?.accessToken)
            .update(values)
            .then(() => {
              toast.success("address updated");
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextField
              label={<div>Address Line 1</div>}
              name="street1"
              type="text"
            />

            <TextField
              label={<div>Address Line 2</div>}
              name="street2"
              type="text"
            />

            <TextField label={<div>City</div>} name="city" type="text" />

            <TextField label={<div>State</div>} name="state" type="text" />

            <TextField label={<div>Zip</div>} name="zip" type="text" />

            <TextField label={<div>Country</div>} name="country" type="text" />

            <SubmitButton text="Update Address" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
