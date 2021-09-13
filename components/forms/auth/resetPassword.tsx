import * as Yup from "yup";

import { Form, Formik } from "formik";

import { AuthApi } from "services/backendApi/auth";
import AuthFormContainer from "./container";
import { SpinnerLg } from "components/spinner";
import { SubmitButton } from "components/buttons";
import { TextFieldFull } from "../fields";
import { signIn } from "next-auth/client";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Must be 8 or more characters")
    .required("Required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Must contain 8 characters, one uppercase, one lowercase, one number and one special character"
    ),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default function ResetPasswordForm(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  const { key } = router.query;
  if (!key) return <SpinnerLg text="Loading..." />;

  return (
    <AuthFormContainer>
      <h3 className="py-4 text-center border-b border-accent">
        Reset Password
      </h3>
      <div className="py-2">
        <Formik
          initialValues={{ password: "", passwordConfirmation: "" }}
          validationSchema={resetPasswordSchema}
          onSubmit={(values, actions) => {
            AuthApi()
              .resetPassword(
                `${key}`,
                values.password,
                values.passwordConfirmation
              )
              .then((response) => {
                signIn("jwt", {
                  ...response.data,
                  redirect: false,
                });
                toast.success(response.data.success);
                router.push("/");
              })
              .catch((error) => {
                toast.error(error.response.data.error);
                const fieldErrors = error.response.data["field-error"];
                for (let i = 0; i < fieldErrors?.length; i += 2) {
                  actions.setFieldError(fieldErrors[i], fieldErrors[i + 1]);
                }
                actions.resetForm();
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
        >
          {(props) => (
            <div className="my-2 space-y-4">
              <Form>
                <div className="space-y-2">
                  <TextFieldFull
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                  />
                  <TextFieldFull
                    name="passwordConfirmation"
                    label="Confirm Password"
                    type="password"
                    placeholder="Password Confirmation"
                  />

                  <SubmitButton
                    text="Reset Password"
                    submitting={props.isSubmitting}
                  />
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </AuthFormContainer>
  );
}
