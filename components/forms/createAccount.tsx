import * as Yup from "yup";

import { ErrorField, TextField } from "./fields";
import { Form, Formik } from "formik";

import FormContainer from "./container";
import { SubmitButton } from "components/buttons";
import api from "services/api";
import { useRouter } from "next/router";

interface Values {
  email: string;
  givenName: string;
  familyName: string;
  password: string;
  passwordConfirmation: string;
}

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
    <FormContainer>
      <h3>Create Account</h3>
      <Formik
        initialValues={{
          email: "",
          givenName: "",
          familyName: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={createAccountSchema}
        onSubmit={async (values: Values, actions) => {
          try {
            const response = await api.post("/auth/create-account", {
              login: values.email,
              given_name: values.givenName,
              family_name: values.familyName,
              password: values.password,
              "password-confirm": values.passwordConfirmation,
            });

            if (response) {
              console.log(response);
              router.push("/");
            }
          } catch (error) {
            actions.setFieldError(
              "formError",
              JSON.stringify(error.response.data)
            );
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <ErrorField name="formError" />

            <TextField name="email" type="email" placeholder="Email" />

            <TextField name="givenName" type="text" placeholder="First name" />
            <TextField name="familyName" type="text" placeholder="Last name" />

            <TextField name="password" type="password" placeholder="Password" />
            <TextField
              name="passwordConfirmation"
              type="password"
              placeholder="Password Confirmation"
            />

            <SubmitButton text="Create Account" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
