import * as Yup from "yup";

import { DropdownCombobox, PictureField, TextFieldFull } from "../fields";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";

import FormContainer from "../container";
import { GenericErrorMessage } from "components/message";
import Link from "next/link";
import { ProfileApi } from "services/backendApi/profile";
import ReactTooltip from "react-tooltip";
import { SmCheckCircleIcon } from "components/icons";
import { SpinnerLg } from "components/spinner";
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
  picture: Yup.string().matches(/^.*\.(jpg|jpeg|png|webp)$/i, {
    message: "Picture must be jpg, jpeg, png or webp",
    excludeEmptyString: true,
  }),
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
  const [imageData, setImageData] = useState({
    data: "",
  });

  function getProfile() {
    const { data, error } = useSWR(
      session ? ["account/profile", session.accessToken] : null
    );

    return {
      profileResponse: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const { profileResponse, isLoading, isError } = getProfile();

  if (isLoading || loading) return <SpinnerLg text="Loading..." />;
  if (isError) return <GenericErrorMessage></GenericErrorMessage>;

  const profile = profileResponse.data;

  return (
    <FormContainer>
      <Formik
        initialValues={{
          givenName: profile.given_name,
          familyName: profile.family_name,
          currency: profile.currency,
          email: profile.email,
          phoneNumber: profile.phone_number,
        }}
        validationSchema={profileSchema}
        onSubmit={(values, actions) => {
          const formData = new FormData();
          formData.append("given_name", values.givenName);
          formData.append("family_name", values.familyName);
          formData.append("currency", values.currency);
          formData.append("picture", imageData.data);
          ProfileApi(session?.accessToken)
            .update(formData)
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

              <PictureField
                label="Profile picture"
                name="picture"
                id={`${idPrefix}picture`}
                previewImage={profile.picture.url}
                setImageData={setImageData}
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
