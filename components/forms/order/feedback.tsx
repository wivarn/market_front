import * as Yup from "yup";

import { Form, Formik } from "formik";
import { TextField, Toggle } from "../fields";

import { IOrder } from "types/order";
import { OrderApi } from "services/backendApi/order";
import { Spinner } from "components/spinner";
import { SubmitButton } from "components/buttons";
import { mutate } from "swr";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface IProps {
  order: IOrder;
}

export default function OrderFeedbackForm({ order }: IProps): JSX.Element {
  const { data: session, status } = useSession();
  const sessionLoading = status === "loading";
  const [recommend, setRecommend] = useState<boolean>(false);

  const orderFeedbackSchema = Yup.object().shape({
    recommend: Yup.boolean().required(),
    feedback: Yup.string().max(1000).nullable(),
  });

  if (sessionLoading) return <Spinner text="Loading..." />;

  return (
    <Formik
      initialValues={{
        recommend: undefined,
        feedback: undefined,
      }}
      validationSchema={orderFeedbackSchema}
      onSubmit={(values, actions) => {
        OrderApi(session?.accessToken)
          .feedback(`${order.id}`, values.recommend, values.feedback)
          .then(() => {
            mutate([
              `orders/${order.id}?relation=purchases`,
              session?.accessToken,
            ]);
            toast.success("Feedback submitted");
          })
          .catch((error) => {
            toast.error(error.response.data.error);
          })
          .finally(() => {
            actions.setSubmitting(false);
          });
      }}
    >
      {(formik) => (
        <Form>
          <div className="my-2 space-y-2">
            <Toggle
              name="recommend"
              label="Would you recommend this seller?"
              enabled={recommend}
              setEnabled={setRecommend}
              onClick={async () => {
                formik.setFieldValue("recommend", !recommend);
              }}
            />

            <TextField name="feedback" placeholder="Add feedback (optional)" />
          </div>

          <SubmitButton text="Save" />
        </Form>
      )}
    </Formik>
  );
}
