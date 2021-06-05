import * as Yup from "yup";

import { Form, Formik } from "formik";

import { AuthApi } from "services/backendApi/auth";
import FormContainer from "../container";
import { SubmitButton } from "components/buttons";
import { TextField } from "../fields";
import { signIn } from "next-auth/client";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";

// interface Values {
//   key?: string | string[];
// }

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Must be 8 or more characters")
    .required("Required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default function ResetPasswordForm() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    // const { key } = router.query;

    // if (key) {
    //   AuthApi()
    //     .verifyAccount(`${key}`)
    //     .then((response) => {
    //       console.log(response);
    //       router.push("/");
    //     })
    //     .catch((_) => {});
    // }
  }, [router.isReady]);

  const { key } = router.query;
  if (!key) return <div>Spinner</div>;

  return (
    <FormContainer>
      <h3>Reset Password</h3>
      <Formik
        initialValues={{ password: "", passwordConfirmation: "" }}
        validationSchema={resetPasswordSchema}
        onSubmit={(values, actions) => {
          AuthApi()
            .resetPassword(
              `${key}`,
              values.password,
              values.passwordConfirmation
            )
            .then((response) => {
              signIn("jwt", {
                ...response.data,
                redirect: false,
              });
              toast(response.data.success);
              router.push("/");
            })
            .catch((error) => {
              const data = error.response.data;
              const message = data["field-error"]
                ? data["field-error"][1]
                : data.error;
              toast(message);
              actions.resetForm();
            });
        }}
      >
        {(props) => (
          <Form>
            <TextField name="password" type="password" placeholder="Password" />
            <TextField
              name="passwordConfirmation"
              type="password"
              placeholder="Password Confirmation"
            />

            <SubmitButton text="Reset Password" disabled={props.isSubmitting} />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
