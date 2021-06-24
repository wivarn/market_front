import * as Yup from "yup";

import { Form, Formik } from "formik";

import { AuthApi } from "services/backendApi/auth";
import AuthFormContainer from "./container";
import { SubmitButton } from "components/buttons";
import { TextFieldFull } from "../fields";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const unlockAccountSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function UnlockAccountForm(): JSX.Element {
  const router = useRouter();
  return (
    <AuthFormContainer>
      <h3 className="py-4 text-center border-b border-accent">
        Unlock Account Request
      </h3>
      <div className="py-2">
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={unlockAccountSchema}
          onSubmit={(values, actions) => {
            AuthApi()
              .unlockAccountRequest(values.email)
              .then((response) => {
                toast.success(response.data.success);
                router.push("/");
              })
              .catch((error) => {
                toast.error(error.response.data.error);
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <div className="my-2 space-y-4">
              <Form>
                <TextFieldFull name="email" type="email" placeholder="Email" />

                <SubmitButton
                  text="Send Unlock Reset"
                  disabled={isSubmitting}
                />
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </AuthFormContainer>
  );
}
