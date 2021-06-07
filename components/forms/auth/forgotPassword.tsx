import * as Yup from "yup";

import { Form, Formik } from "formik";

import { AuthApi } from "services/backendApi/auth";
import FormContainer from "../container";
import { SubmitButton } from "components/buttons";
import { TextField } from "../fields";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function ForgotPasswordForm() {
  const router = useRouter();
  return (
    <FormContainer>
      <h3>Reset Password Request</h3>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={forgotPasswordSchema}
        onSubmit={async (values) => {
          AuthApi()
            .passwordResetRequest(values.email)
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
            <TextField name="email" type="email" placeholder="Email" />

            <SubmitButton text="Send Password Reset" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
