import * as Yup from "yup";

import { Form, Formik } from "formik";

import { AuthApi } from "services/backendApi/auth";
import AuthFormContainer from "../container";
import { SubmitButton } from "components/buttons";
import { TextFieldFull } from "../fields";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const unlockAccountSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function UnlockAccountForm() {
  const router = useRouter();
  return (
    <AuthFormContainer>
      <h3>Unlock Account Request</h3>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={unlockAccountSchema}
        onSubmit={async (values) => {
          AuthApi()
            .unlockAccountRequest(values.email)
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
            <TextFieldFull name="email" type="email" placeholder="Email" />

            <SubmitButton text="Send Unlock Reset" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </AuthFormContainer>
  );
}
