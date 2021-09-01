import * as Yup from "yup";

import { Form, Formik } from "formik";
import { SecondaryButton, SubmitButton } from "components/buttons";

import { AuthApi } from "services/backendApi/auth";
import AuthFormContainer from "./container";
import { SpinnerLg } from "components/spinner";
import { TextFieldFull } from "../fields";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const changeLoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be 8 or more characters")
    .required("Password is required"),
});

export default function ChangeLoginForm(): JSX.Element {
  const router = useRouter();
  const [session, sessionLoading] = useSession();

  if (sessionLoading) return <SpinnerLg text="Loading..." />;

  return (
    <AuthFormContainer>
      <h3 className="py-4 text-center border-b border-accent">Change Email</h3>
      <div className="py-2">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={changeLoginSchema}
          onSubmit={(values, actions) => {
            AuthApi(session?.accessToken)
              .changeLogin(values.email, values.password)
              .then((response) => {
                toast.success(response.data.success);
                router.push("/");
              })
              .catch((error) => {
                toast.error(error.response.data.error);
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="my-2 space-y-4">
                <TextFieldFull
                  name="email"
                  label="Email"
                  id="change-email"
                  type="email"
                  placeholder="Email"
                />

                <TextFieldFull
                  name="password"
                  id="change-email-password"
                  type="password"
                  label="Password"
                />
                <div className="flex flex-wrap">
                  <SubmitButton text="Change email" submitting={isSubmitting} />
                  <SecondaryButton text="Cancel" submitting={isSubmitting} />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AuthFormContainer>
  );
}
