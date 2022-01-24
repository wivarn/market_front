import * as Yup from "yup";

import { Form, Formik } from "formik";

import AuthFormContainer from "./container";
import Link from "next/link";
import { SecondaryButton } from "components/buttons";
import { SubmitButtonFull } from "components/buttons";
import { TextFieldFull } from "../fields";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";

interface Values {
  login: string;
  password: string;
  formError?: string;
}

const loginSchema = Yup.object().shape({
  login: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 or more characters")
    .required("Password is required"),
});

const idPrefix = "login-form-";

export default function LoginForm(): JSX.Element {
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
    <div className="my-8">
      <AuthFormContainer>
        <h1 className="py-4 text-center border-b h3 border-accent">
          Log in to your account
        </h1>
        <div className="py-2">
          <Formik
            initialValues={{
              login: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values: Values, actions) => {
              signIn("credentials", {
                login: values.login,
                password: values.password,
                redirect: false,
              })
                .then((response: any) => {
                  if (response?.error) {
                    actions.setSubmitting(false);
                    actions.setFieldValue("password", "", false);
                    toast.error(response.error);
                    if (response.error.includes("locked")) {
                      setLocked(true);
                    }
                  } else {
                    router.push(`${router.query.redirect || "/"}`);
                  }
                })
                .finally(() => {
                  actions.setSubmitting(false);
                });
            }}
          >
            {(props) => (
              <Form>
                {renderLockedBanner()}
                <div className="my-2 space-y-4">
                  <TextFieldFull
                    name="login"
                    id={`${idPrefix}login`}
                    type="email"
                    label="Email"
                  />

                  <TextFieldFull
                    name="password"
                    id={`${idPrefix}password`}
                    type="password"
                    label="Password"
                  />
                  <SubmitButtonFull
                    text="Log in"
                    submitting={props.isSubmitting}
                  />
                  <div>
                    <Link href="/auth/forgotPassword">
                      <a className="text-sm underline text-info">
                        Forgot Password?
                      </a>
                    </Link>
                  </div>
                </div>
                <p className="text-sm text-accent-dark">
                  By logging in you agree to Skwirl&#39;s{" "}
                  <a
                    href="https://support.skwirl.io/kb/en/article/terms-of-service"
                    rel="noreferrer"
                    target="_blank"
                    className="underline text-info"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://support.skwirl.io/kb/en/article/privacy-policy"
                    rel="noreferrer"
                    target="_blank"
                    className="underline text-info"
                  >
                    Privacy Policy
                  </a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
        <div className="py-4 mt-4 border-t border-accent">
          <p className="py-2 text-accent-darkest">
            {"Don't have an account yet?"}
          </p>
          <SecondaryButton href="/account/new" text="Create new account" />
        </div>
      </AuthFormContainer>
    </div>
  );
}
