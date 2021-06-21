import * as Yup from "yup";

import { DropdownCombobox, TextFieldFull } from "../fields";
import { Form, Formik } from "formik";
import { SmCheckCircleIcon, SmExclamationCircleIcon } from "components/icons";
import useSWR, { mutate } from "swr";

import FormContainer from "../container";
import Link from "next/link";
import { ProfileApi } from "services/backendApi/profile";
import { SpinnerPage } from "components/spinner";
import { SubmitButtonFull } from "components/buttons";
import { toast } from "react-toastify";
import { useSession } from "next-auth/client";

const currencyList = [
  { value: "CAD", text: "CAD" },
  { value: "USD", text: "USD" },
];

const profileSchema = Yup.object().shape({
  givenName: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("First name is required"),
  familyName: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Last name is required"),
  currency: Yup.mixed()
    .oneOf(
      currencyList.map((currency) => {
        return currency.value;
      }),
      "invalid currency"
    )
    .required("Currency is required"),
});

const idPrefix = "profile-form-";

const emailLabel = () => {
  return (
    <div className="flex space-x-2">
      <span className="font-medium">Email</span>
      <span className="text-success">
        <SmCheckCircleIcon />
      </span>
      <Link href="account/changeEmail">
        <a className="font-normal underline text-info">edit</a>
      </Link>
    </div>
  );
};

const phoneNumberLabel = () => {
  return (
    <div className="flex space-x-2">
      <span className="font-medium">Phone Number</span>
      <span className="text-warning">
        <SmExclamationCircleIcon />
      </span>
      <Link href="account/changePhoneNumber">
        <a className="font-normal underline text-info">edit</a>
      </Link>
    </div>
  );
};

export default function ProfileForm(): JSX.Element {
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

  if (isLoading || loading) return <SpinnerPage text="Loading..." />;
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
        onSubmit={(values, actions) => {
          ProfileApi(session?.accessToken)
            .update(values)
            .then(() => {
              toast.success("Your profile has been updated");
              mutate(["account/profile", session?.accessToken]);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {(formik) => (
          <Form>
            <TextFieldFull
              label="First Name"
              name="givenName"
              id={`${idPrefix}givenName`}
            />
            <TextFieldFull
              label="Last Name"
              name="familyName"
              id={`${idPrefix}familyName`}
            />
            <DropdownCombobox
              label="Currency"
              name="currency"
              items={currencyList}
            />

            <TextFieldFull
              label={emailLabel()}
              name="email"
              id={`${idPrefix}email`}
              disabled={true}
            />
            <TextFieldFull
              label={phoneNumberLabel()}
              name="phoneNumber"
              id={`${idPrefix}phoneNumber`}
              disabled={true}
            />

            <SubmitButtonFull
              text="Update Profile"
              disabled={formik.isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
