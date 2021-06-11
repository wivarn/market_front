import * as Yup from "yup";

import { CheckCircleIcon, ExclamationCircleIcon } from "components/icons";
import { Form, Formik } from "formik";
import { SelectBox, TextField } from "../fields";
import useSWR, { mutate } from "swr";

import FormContainer from "../container";
import Link from "next/link";
import { ProfileApi } from "services/backendApi/profile";
import { SubmitButtonWide } from "components/buttons";
import { toast } from "react-toastify";
import { useSession } from "next-auth/client";

const currencyList = { USD: "USD", CAD: "CAD" };

const profileSchema = Yup.object().shape({
  givenName: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("First name is required"),
  familyName: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Last name is required"),
  currency: Yup.mixed().oneOf(Object.keys(currencyList), "invalid currency"),
});

const emailLabel = () => {
  return (
    <div className="flex space-x-2">
      <span className="font-semibold">Email</span>
      <span className="text-success">
        <CheckCircleIcon />
      </span>
      <Link href="account/changeEmail">
        <a className="font-normal underline text-info">(edit)</a>
      </Link>
    </div>
  );
};

const phoneNumberLabel = () => {
  return (
    <div className="flex space-x-2">
      <span className="font-semibold">Phone Number</span>
      <span className="text-warning">
        <ExclamationCircleIcon />
      </span>
      <Link href="account/changePhoneNumber">
        <a className="font-normal underline text-info">(edit)</a>
      </Link>
    </div>
  );
};

export default function ProfileForm() {
  const [session, loading] = useSession();

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

  const { profile, isLoading, isError } = getProfile();

  if (isLoading || loading) return <div>Spinner</div>;
  if (isError) return <div>Error</div>;

  return (
    <FormContainer>
      <Formik
        initialValues={{
          givenName: profile.data.given_name,
          familyName: profile.data.family_name,
          currency: profile.data.currency,
          email: profile.data.email,
          phoneNumber: profile.data.phone_number,
        }}
        validationSchema={profileSchema}
        onSubmit={async (values) => {
          ProfileApi(session?.accessToken)
            .update(values)
            .then(() => {
              toast.success("Profile updated");
              mutate(["account/profile", session?.accessToken]);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextField label="First Name" name="givenName" type="text" />
            <TextField label="Last Name" name="familyName" type="text" />
            <SelectBox
              label="Currency"
              name="currency"
              options={currencyList}
            />

            <TextField
              label={emailLabel()}
              name="email"
              type="text"
              disabled={true}
            />
            <TextField
              label={phoneNumberLabel()}
              name="phoneNumber"
              type="text"
              disabled={true}
            />

            <SubmitButtonWide text="Update Profile" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
