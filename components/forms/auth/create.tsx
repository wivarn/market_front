import * as Yup from "yup";

import { Form, Formik } from "formik";

import { Account } from "types/account";
import { AuthApi } from "services/backendApi/auth";
import AuthFormContainer from "./container";
import { SecondaryButton } from "components/buttons";
import { SubmitButtonFull } from "components/buttons";
import { TextFieldFull } from "../fields";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const createAccountSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  givenName: Yup.string()
    .min(1, "Must be 1 or more characters")
    .max(256, "Must be at most 256 characters")
    .required("Required"),
  familyName: Yup.string()
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
              givenName: "",
              familyName: "",
              password: "",
              passwordConfirmation: "",
            }}
            validationSchema={createAccountSchema}
            onSubmit={(account: Account, actions) => {
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
                    name="givenName"
                    id={`${idPrefix}givenName`}
                    label="First name"
                  />
                  <TextFieldFull
                    name="familyName"
                    id={`${idPrefix}familyName`}
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
                    disabled={isSubmitting}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="py-4 mt-4 border-t border-accent">
          <p className="py-2 text-accent-darkest">Already have an account?</p>
          <SecondaryButton href="/login" text="Back to log in" />
        </div>
      </AuthFormContainer>
    </div>
  );
}
