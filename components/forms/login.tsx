import * as Yup from "yup";

import { Form, Formik, FormikHelpers } from "formik";

import FormContainer from "./container";
import { SubmitButton } from "components/buttons";
import { TextField } from "./fields";
import { signIn } from "next-auth/client";

interface Values {
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 or more characters")
    .required("Required"),
});

export default function LoginForm() {
  return (
    <FormContainer>
      <h3>Login</h3>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          signIn("credentials", {
            login: values.email,
            password: values.password,
            callbackUrl: "/",
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextField name="email" type="email" placeholder="Email" />

            <TextField name="password" type="password" placeholder="Password" />

            <SubmitButton text="Login" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
