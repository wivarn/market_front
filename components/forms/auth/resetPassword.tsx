import * as Yup from "yup";

import { Form, Formik } from "formik";

import { AuthApi } from "services/backendApi/auth";
import AuthFormContainer from "./container";
import { SpinnerPage } from "components/spinner";
import { SubmitButton } from "components/buttons";
import { TextFieldFull } from "../fields";
import { signIn } from "next-auth/client";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Must be 8 or more characters")
    .required("Required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default function ResetPasswordForm() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  const { key } = router.query;
  if (!key) return <SpinnerPage text="Loading..." />;

  return (
    <AuthFormContainer>
      <h3>Reset Password</h3>
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
              const data = error.response.data;
              const message = data["field-error"]
                ? data["field-error"][1]
                : data.error;
              toast.error(message);
              actions.resetForm();
            });
        }}
      >
        {(props) => (
          <Form>
            <TextFieldFull
              name="password"
              type="password"
              placeholder="Password"
            />
            <TextFieldFull
              name="passwordConfirmation"
              type="password"
              placeholder="Password Confirmation"
            />

            <SubmitButton text="Reset Password" disabled={props.isSubmitting} />
          </Form>
        )}
      </Formik>
    </AuthFormContainer>
  );
}
