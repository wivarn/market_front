import * as Yup from "yup";

import { Form, Formik } from "formik";

import FormContainer from "../container";
import Link from "next/link";
import { SubmitButton } from "components/buttons";
import { TextField } from "../fields";
import { signIn } from "next-auth/client";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";

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
  const [locked, setLocked] = useState(false);
  const router = useRouter();

  function renderLockedBanner() {
    if (locked) {
      return (
        <div className="border-2 rounded max-w-max bg-error-lightest border-error">
          <p className="p-1.5">
            Your account has been locked, please{" "}
            <Link href="/auth/forgotPassword">
              <a className="underline">reset your password</a>
            </Link>{" "}
            or{" "}
            <Link href="/auth/unlock">
              <a className="underline">click here to unlock.</a>
            </Link>
          </p>
        </div>
      );
    }
  }

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
            if (response?.error) {
              actions.setSubmitting(false);
              actions.setFieldValue("password", "", false);
              toast.error(response.error);
              if (response.error.includes("locked")) {
                setLocked(true);
              }
            } else {
              router.push("/");
            }
          });
        }}
      >
        {(props) => (
          <Form>
            {renderLockedBanner()}

            <TextField name="email" type="email" placeholder="Email" />

            <TextField name="password" type="password" placeholder="Password" />

            <Link href="/auth/forgotPassword">
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
