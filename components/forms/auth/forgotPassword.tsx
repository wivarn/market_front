import * as Yup from "yup";

import { Form, Formik } from "formik";

import { AuthApi } from "services/backendApi/auth";
import AuthFormContainer from "./container";
import { SecondaryButton } from "components/buttons";
import { SubmitButton } from "components/buttons";
import { TextFieldFull } from "../fields";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function ForgotPasswordForm(): JSX.Element {
  const router = useRouter();
  return (
    <AuthFormContainer>
      <h3 className="py-4 text-center border-b border-accent">
        Reset Password Request
      </h3>
      <div className="py-2">
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={forgotPasswordSchema}
          onSubmit={(values, actions) => {
            AuthApi()
              .passwordResetRequest(values.email)
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
                  id="password-reset-email"
                  type="email"
                  placeholder="Email"
                />

                <SubmitButton
                  text="Send Password Reset"
                  submitting={isSubmitting}
                />
              </div>
              <div className="py-4 mt-4 border-t border-accent">
                <p className="py-2 text-accent-darkest">
                  Remember your password?
                </p>
                <SecondaryButton href="/login" text="Back to log in" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AuthFormContainer>
  );
}
