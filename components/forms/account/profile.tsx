import * as Yup from "yup";

import { DropdownCombobox, TextFieldFull } from "../fields";
import { Form, Formik } from "formik";
import { SmCheckCircleIcon, SmExclamationCircleIcon } from "components/icons";
import useSWR, { mutate } from "swr";
import FormContainer from "../container";
import Link from "next/link";
import { ProfileApi } from "services/backendApi/profile";
import ReactTooltip from "react-tooltip";
import { SpinnerLg } from "components/spinner";
import { SubmitButtonFull } from "components/buttons";
import { toast } from "react-toastify";
import { useSession } from "next-auth/client";
import { GenericErrorMessage } from "components/message";

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
    <div className="flex items-center space-x-2">
      <span className="font-semibold">Email</span>
      <span data-tip data-for="email" className="text-success">
        <SmCheckCircleIcon />
        <ReactTooltip
          id="email"
          type="dark"
          wrapper="span"
          place="top"
          effect="solid"
        >
          Your email is verified
        </ReactTooltip>
      </span>
      <Link href="account/changeEmail">
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

  if (isLoading || loading) return <SpinnerLg text="Loading..." />;
  if (isError) return <GenericErrorMessage></GenericErrorMessage>;

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
            <div className="my-2 space-y-2">
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
                label="Phone Number (optional)"
                name="phoneNumber"
                id={`${idPrefix}phoneNumber`}
                disabled={true}
              />

              <SubmitButtonFull
                text="Update Profile"
                disabled={formik.isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
