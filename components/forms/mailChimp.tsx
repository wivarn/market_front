import * as Yup from "yup";

import { Form, Formik } from "formik";

import { SubmitButton } from "components/buttons";
import { TextField } from "./fields";
import axios from "axios";
import { toast } from "react-toastify";

const mailChimpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function MailChimpForm(): JSX.Element {
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={mailChimpSchema}
      onSubmit={(values, actions) => {
        axios
          .post("/api/subscribe", {
            email: values.email,
          })
          .then(() => {
            toast.success("You have been subscribed");
          })
          .catch((error) => {
            if (error.response.data.title === "Member Exists") {
              toast.error(`${values.email} is already subscribed`);
            } else {
              toast.error("Subscription failed");
            }
            actions.resetForm();
          })
          .finally(() => {
            actions.setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <span className="mx-2 space-x-4">
            <TextField
              name="email"
              id="subscribe-mailchimp"
              type="email"
              placeholder="Email"
            />

            <SubmitButton text="Subscribe to updates" disabled={isSubmitting} />
          </span>
        </Form>
      )}
    </Formik>
  );
}
