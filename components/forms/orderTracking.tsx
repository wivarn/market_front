import * as Yup from "yup";

import { Form, Formik } from "formik";

import { OrderApi } from "services/backendApi/order";
import { SubmitButton } from "components/buttons";
import { TextField } from "./fields";
import { toast } from "react-toastify";
import { useSession } from "next-auth/client";

const orderTrackingSchema = Yup.object().shape({
  tracking: Yup.string(),
});

interface props {
  orderId: string;
  tracking: string;
}

export default function OrderTrackingForm({
  orderId,
  tracking,
}: props): JSX.Element {
  const [session] = useSession();

  return (
    <Formik
      initialValues={{
        tracking: tracking,
      }}
      validationSchema={orderTrackingSchema}
      onSubmit={(values, actions) => {
        OrderApi(session?.accessToken)
          .update("sales", orderId, values.tracking)
          .then(() => {
            toast.success("Tracking info has been updated");
          })
          .catch(() => {
            toast.error("Failed to update tracking");
          })
          .finally(() => {
            actions.setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <span className="flex items-end space-x-4">
            <TextField
              name="tracking"
              id={`order-${orderId}-tracking`}
              placeholder="Add Tracking (optional)"
              label="Tracking Number"
            />

            <SubmitButton text="Save" disabled={isSubmitting} />
          </span>
        </Form>
      )}
    </Formik>
  );
}
