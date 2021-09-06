import * as Yup from "yup";

import { Form, Formik } from "formik";

import { SubmitButton } from "components/buttons";
import { TextField } from "./fields";
import axios from "axios";
import { toast } from "react-toastify";

const mailChimpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required to subscribe"),
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
              toast.warn(`${values.email} has already subscribed`);
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
          <span className="grid space-y-4 justify-items-center">
            <TextField
              name="email"
              id="subscribe-mailchimp"
              type="email"
              placeholder="Enter your email"
            />

            <SubmitButton text="Subscribe now" submitting={isSubmitting} />
          </span>
        </Form>
      )}
    </Formik>
  );
}
