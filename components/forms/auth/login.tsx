import * as Yup from "yup";

import { Form, Formik } from "formik";

import FormContainer from "../container";
import Link from "next/link";
import { SecondaryButton } from "components/buttons";
import { SubmitButtonFull } from "components/buttons";
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
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 or more characters")
    .required("Password is required"),
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
    <>
      <h2 className="mt-8 text-center">Log in to your account</h2>
      <FormContainer>
        <div className="py-2">
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

                <TextField name="email" type="email" label="Email" />

                <TextField name="password" type="password" label="Password" />
                <SubmitButtonFull text="Log in" disabled={props.isSubmitting} />
                <Link href="/auth/forgotPassword">
                  <a className="underline text-info">
                    <p className="py-2 text-sm">Forgot Password?</p>
                  </a>
                </Link>
              </Form>
            )}
          </Formik>
        </div>
        <div className="py-4 mt-4 border-t border-accent">
          <p className="py-2 text-accent-darkest">
            Don't have an account? Sign up!
          </p>
          <SecondaryButton href="/account/new" text="Create Account" />
        </div>
      </FormContainer>
    </>
  );
}
