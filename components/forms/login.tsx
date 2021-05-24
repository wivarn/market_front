import * as Yup from "yup";

import { Form, Formik, FormikHelpers } from "formik";

import { TextField } from "./fields";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

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
  const router = useRouter();
  return (
    <div className="m-2 border border-blue-500">
      <h1 className="font-bold">Login</h1>
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
          });
          router.push("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextField
              label="Email"
              name="email"
              type="email"
              placeholder="example@email.com"
            />

            <TextField label="Password" name="password" type="password" />

            <button
              type="submit"
              className="bg-red-900 p-2 font-bold hover:bg-red-700"
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
