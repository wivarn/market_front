import * as Yup from "yup";

import { ErrorField, TextField } from "../fields";
import { Form, Formik } from "formik";

import { AuthApi } from "services/backendApi/auth";
import FormContainer from "../container";
import { SubmitButton } from "components/buttons";
import { useRouter } from "next/router";

interface Values {
  key?: string | string[];
}

const verifySchema = Yup.object().shape({
  key: Yup.string().required(),
});

export default function VerifyAccountForm() {
  const router = useRouter();

  if (!router.isReady) return <div>Spinner</div>;

  const { key } = router.query;

  if (key) {
    console.log(key);
    AuthApi()
      .verifyAccount(`${key}`)
      .then((response) => {
        console.log(response);
        router.push("/");
      })
      .catch((error) => {});
  }

  return (
    <FormContainer>
      <h3>Verify Account</h3>
      <Formik
        initialValues={{ key: key }}
        validationSchema={verifySchema}
        onSubmit={(values: Values, actions) => {
          AuthApi()
            .verifyAccount(`${values.key}`)
            .then((response) => {
              console.log(response);
              router.push("/");
            })
            .catch((error) => {
              actions.resetForm();
              actions.setFieldError("formError", error.response.data.error);
            });
        }}
      >
        {(props) => (
          <Form>
            <ErrorField name="formError" />

            <TextField name="key" type="key" placeholder="Verification key" />

            <SubmitButton text="Verify" disabled={props.isSubmitting} />
          </Form>
        )}
        {/* TODO resend verify button */}
      </Formik>
    </FormContainer>
  );
}
