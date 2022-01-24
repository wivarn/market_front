import * as Yup from "yup";

import { Form, Formik } from "formik";
import { TextFieldFull, Toggle } from "../fields";

import { AuthApi } from "services/backendApi/auth";
import AuthFormContainer from "./container";
import { ICreateAccount } from "types/account";
import { InfoMessage } from "components/message";
import { SecondaryButton } from "components/buttons";
import { SubmitButtonFull } from "components/buttons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";

const createAccountSchema = Yup.object().shape({
  login: Yup.string().email("Invalid email").required("Required"),
  given_name: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Required"),
  family_name: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Required"),
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
  marketing: Yup.boolean().required("required"),
});

const idPrefix = "create-account-";

export default function CreateAccountForm(): JSX.Element {
  const router = useRouter();
  const [marketing, setMarketing] = useState<boolean>(true);

  return (
    <div className="my-8">
      <AuthFormContainer>
        <h1 className="py-4 text-center border-b h3 border-accent">
          Create a new account
        </h1>
        <div className="py-2">
          <Formik
            initialValues={{
              login: "",
              given_name: "",
              family_name: "",
              password: "",
              passwordConfirmation: "",
              marketing: marketing,
            }}
            validationSchema={createAccountSchema}
            onSubmit={(account: ICreateAccount, actions) => {
              AuthApi()
                .createAccount(account)
                .then((response) => {
                  toast.success(response.data.success);
                  router.push("/");
                })
                .catch((error) => {
                  toast.error(error.response.data.error);
                  const fieldErrors = error.response.data["field-error"];
                  for (let i = 0; i < fieldErrors?.length; i += 2) {
                    actions.setFieldError(fieldErrors[i], fieldErrors[i + 1]);
                  }
                })
                .finally(() => {
                  actions.setSubmitting(false);
                });
            }}
          >
            {(formik) => (
              <Form>
                <div className="my-2 space-y-4">
                  <TextFieldFull
                    name="login"
                    id={`${idPrefix}login`}
                    type="email"
                    label="Email"
                  />

                  <TextFieldFull
                    name="given_name"
                    id={`${idPrefix}given_name`}
                    label="First name"
                  />
                  <TextFieldFull
                    name="family_name"
                    id={`${idPrefix}family_name`}
                    label="Last name"
                  />

                  <TextFieldFull
                    name="password"
                    id={`${idPrefix}password`}
                    type="password"
                    label="Password"
                  />
                  <TextFieldFull
                    name="passwordConfirmation"
                    id={`${idPrefix}passwordConfirmation`}
                    type="password"
                    label="Password Confirmation"
                  />

                  <Toggle
                    name="marketing"
                    label="Subscribe to our newsletter with exclusive offers"
                    enabled={marketing}
                    setEnabled={setMarketing}
                    onClick={async () => {
                      formik.setFieldValue("marketing", !marketing);
                    }}
                  />

                  <SubmitButtonFull
                    text="Create Account"
                    submitting={formik.isSubmitting}
                  />
                  <InfoMessage>
                    Remember to check your spam folder for the verification
                    email.
                  </InfoMessage>
                  <p className="text-sm text-accent-dark">
                    By creating an account you agree to Skwirl&#39;s{" "}
                    <a
                      href="https://support.skwirl.io/kb/en/article/terms-of-service"
                      rel="noreferrer"
                      target="_blank"
                      className="underline text-info"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://support.skwirl.io/kb/en/article/privacy-policy"
                      rel="noreferrer"
                      target="_blank"
                      className="underline text-info"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="py-4 mt-4 border-t border-accent">
          <p className="py-2 text-accent-darkest">Already have an account?</p>
          <span className="space-x-2">
            <SecondaryButton href="/login" text="Log in now" />
            <SecondaryButton
              href="/account/verifyAccountResend"
              text="Resend verification email"
            />
          </span>
        </div>
      </AuthFormContainer>
    </div>
  );
}
