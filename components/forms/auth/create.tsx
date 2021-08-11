import * as Yup from "yup";

import { Form, Formik } from "formik";

import { AuthApi } from "services/backendApi/auth";
import AuthFormContainer from "./container";
import { IAccount } from "types/account";
import { SecondaryButton } from "components/buttons";
import { SubmitButtonFull } from "components/buttons";
import { TextFieldFull } from "../fields";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const createAccountSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
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
    .required("Required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const idPrefix = "create-account-";

export default function CreateAccountForm(): JSX.Element {
  const router = useRouter();

  return (
    <div className="my-8">
      <AuthFormContainer>
        <h3 className="py-4 text-center border-b border-accent">
          Create a new account
        </h3>
        <div className="py-2">
          <Formik
            initialValues={{
              email: "",
              given_name: "",
              family_name: "",
              password: "",
              passwordConfirmation: "",
            }}
            validationSchema={createAccountSchema}
            onSubmit={(account: IAccount, actions) => {
              AuthApi()
                .createAccount(account)
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
                    id={`${idPrefix}email`}
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

                  <SubmitButtonFull
                    text="Create Account"
                    submitting={isSubmitting}
                  />
                  <p className="text-sm text-accent-dark">
                    By creating an account you agree to Skwirl&#39;s{" "}
                    <a
                      href="https://skwirl.zendesk.com/hc/en-us/articles/4404540187283-Our-Terms-of-Service"
                      rel="noreferrer"
                      target="_blank"
                      className="underline text-info"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://skwirl.zendesk.com/hc/en-us/articles/4403778415763-Our-Privacy-Policy"
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
          <SecondaryButton href="/login" text="Log in now" />
        </div>
      </AuthFormContainer>
    </div>
  );
}
