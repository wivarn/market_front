import * as Yup from "yup";

import { ErrorField, TextField } from "../fields";
import { Form, Formik } from "formik";

import FormContainer from "../container";
import Link from "next/link";
import { SubmitButton } from "components/buttons";
import { signIn } from "next-auth/client";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface Values {
  email: string;
  password: string;
  formError?: string;
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
    <FormContainer>
      <h3>Login</h3>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async (values: Values, actions) => {
          signIn("credentials", {
            login: values.email,
            password: values.password,
            redirect: false,
          }).then((response) => {
            if (response?.ok) {
              router.push("/");
            } else {
              actions.setSubmitting(false);
              actions.setFieldValue("password", "");
              toast("Email or password is invalid");
            }
          });
        }}
      >
        {(props) => (
          <Form>
            <ErrorField name="formError" />

            <TextField name="email" type="email" placeholder="Email" />

            <TextField name="password" type="password" placeholder="Password" />

            <Link href="/account/forgotPassword">
              <a className="underline text-primary">
                <p>Forgot Password?</p>
              </a>
            </Link>
            <SubmitButton text="Login" disabled={props.isSubmitting} />
          </Form>
        )}
      </Formik>
      <Link href="/account/new">
        <a>
          <SubmitButton text="Create Account" />
        </a>
      </Link>
    </FormContainer>
  );
}
