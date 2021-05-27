import * as Yup from "yup";

import { Form, Formik, FormikHelpers } from "formik";

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
    <div className="m-4 border-2 p-2 rounded-md bg-gray-50">
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
            <TextField
              className="px-2 py-1 border-2 rounded-md"
              name="email"
              type="email"
              placeholder="Email"
            />

            <TextField
              className="px-2 py-1 border-2 rounded-md"
              name="password"
              type="password"
              placeholder="Password"
            />

            <button
              type="submit"
              className="rounded bg-blue-800 text-white hover:bg-blue-50 hover:text-blue-800 border-2 border-blue-800 px-2 py-1 font-semibold"
              disabled={isSubmitting}
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
