import * as Yup from "yup";

import { Form, Formik } from "formik";

import FormContainer from "../container";
import { ProfileApi } from "services/backendApi/profile";
import { SubmitButton } from "components/buttons";
import { TextField } from "../fields";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useSession } from "next-auth/client";

const profileSchema = Yup.object().shape({
  givenName: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Required"),
  familyName: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Required"),
});

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
        }}
        validationSchema={profileSchema}
        onSubmit={async (values) => {
          ProfileApi(session?.accessToken)
            .update(values)
            .then((response) => {
              toast.success("Profile updated");
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextField label="First Name " name="givenName" type="text" />
            <TextField label="Last Name " name="familyName" type="text" />

            <SubmitButton text="Update" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
