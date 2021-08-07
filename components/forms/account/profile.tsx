import * as Yup from "yup";

import { Form, Formik } from "formik";
import { PictureField, TextFieldFull } from "../fields";
import React, { useEffect, useState } from "react";

import FormContainer from "../container";
import { GenericErrorMessage } from "components/message";
import { IAccount } from "types/account";
import Link from "next/link";
import { ProfileApi } from "services/backendApi/profile";
import ReactTooltip from "react-tooltip";
import { SmCheckCircleIcon } from "components/icons";
import { SpinnerLg } from "components/spinner";
import { SubmitButtonFull } from "components/buttons";
import { toast } from "react-toastify";
import { useSession } from "next-auth/client";

const profileSchema = Yup.object().shape({
  given_name: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("First name is required"),
  family_name: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Last name is required"),
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
  const [session, sessionLoading] = useSession();
  const [imageData, setImageData] = useState<string | Blob>("");
  const [profile, setProfile] = useState<IAccount | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionLoading) return;
    ProfileApi(session?.accessToken)
      .get()
      .then((profileResponse) => {
        setProfile(profileResponse.data);
      })
      .catch(() => {
        setError(true);
      });
  }, [sessionLoading]);

  if (sessionLoading || !profile) return <SpinnerLg text="Loading..." />;
  if (error) return <GenericErrorMessage />;

  return (
    <FormContainer>
      <Formik
        initialValues={{
          given_name: profile.given_name,
          family_name: profile.family_name,
          email: profile.email,
          phoneNumber: profile.phone_number,
        }}
        validationSchema={profileSchema}
        onSubmit={(values, actions) => {
          const formData = new FormData();
          formData.append("given_name", `${values.given_name}`);
          formData.append("family_name", `${values.family_name}`);
          ProfileApi(session?.accessToken)
            .update(formData, imageData)
            .then(() => {
              toast.success("Your profile has been updated");
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
                name="given_name"
                id={`${idPrefix}givenName`}
              />
              <TextFieldFull
                label="Last Name"
                name="family_name"
                id={`${idPrefix}familyName`}
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
                label="Profile Picture"
                name="picture"
                id={`${idPrefix}picture`}
                previewImage={`${profile?.picture?.url}`}
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
