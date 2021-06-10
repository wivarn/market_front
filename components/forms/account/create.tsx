import * as Yup from "yup";

import { ErrorField, TextField } from "../fields";
import { Form, Formik } from "formik";

import { Account } from "types/account";
import { AuthApi } from "services/backendApi/auth";
import FormContainer from "../container";
import {SecondaryButton} from "components/buttons"
import { SubmitButtonWide } from "components/buttons";
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

export default function CreateAccountForm() {
  const router = useRouter();

  return (
    <div className="container max-w-lg mx-auto mt-8">
      <h2 className="text-center">Create a new account</h2>
      <FormContainer>
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
            onSubmit={async (account: Account) => {
              await AuthApi()
                .createAccount(account)
                .then((response) => {
                  toast.success(response.data.success);
                  router.push("/");
                })
                .catch((error) => {
                  toast.error(error.response.data.error);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <ErrorField name="formError" />

                <TextField name="email" type="email" label="Email" />

                <TextField name="givenName" type="text" label="First name" />
                <TextField name="familyName" type="text" label="Last name" />

                <TextField name="password" type="password" label="Password" />
                <TextField
                  name="passwordConfirmation"
                  type="password"
                  label="Password Confirmation"
                />

                <SubmitButtonWide
                  text="Create Account"
                  disabled={isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </div>
        <div className="py-4 mt-4 border-t border-accent">
          <p className="py-2 text-accent-darkest">
            Already have an account? 
          </p>
          <SecondaryButton href="/login" text="Back to log in" />
        </div>
      </FormContainer>
    </div>
  );
}
