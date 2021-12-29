import * as Yup from "yup";

import { Form, Formik } from "formik";
import { IOrder, IOrderDetails } from "types/order";
import { useEffect, useState } from "react";

import Link from "next/link";
import { OrderApi } from "services/backendApi/order";
import { RadioGroup } from "@headlessui/react";
import { Spinner } from "components/spinner";
import { SubmitButton } from "components/buttons";
import { TextAreaFull } from "../fields";
import { mutate } from "swr";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

interface OrderRecommendFormProps {
  order: IOrder;
}

interface OrderFeedbackFormProps {
  order: IOrderDetails;
}

export function OrderRecommendForm({
  order,
}: OrderRecommendFormProps): JSX.Element {
  const { data: session, status } = useSession();
  const sessionLoading = status === "loading";
  const [recommend, setRecommend] = useState<boolean | undefined>(
    order.review?.recommend
  );
  const disabled = order.aasm_state == "reserved";

  useEffect(() => {
    if (recommend === order.recommend) return;

    OrderApi(session?.accessToken)
      .review(`${order.id}`, recommend, null)
      .then((response) => {
        order.recommend = response.data.recommend;
        toast.success("Feedback submitted");
      })
      .catch((error) => {
        setRecommend(order.recommend);
        toast.error(error.response.data.error);
      });
  }, [recommend]);

  if (sessionLoading) return <Spinner text="Loading..." />;

  return (
    <div className="px-4 py-2 border-b bg-secondary-light">
      <RadioGroup value={recommend} onChange={setRecommend} disabled={disabled}>
        <div className="flex items-center space-x-1">
          <RadioGroup.Label>
            <p className="text-sm">Would you recommend the seller?</p>
          </RadioGroup.Label>
          <div className="flex text-sm rounded-md cursor-pointer">
            <RadioGroup.Option value={true}>
              {({ checked }) => (
                <span
                  className={
                    checked
                      ? "bg-success-lightest border rounded-l-md border-success px-2"
                      : "rounded-l-md border px-2 bg-accent-lightest"
                  }
                >
                  Yes
                </span>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value={false}>
              {({ checked }) => (
                <span
                  className={
                    checked
                      ? "border rounded-r-md border-error bg-error-lightest px-2"
                      : "border px-2 bg-accent-lightest rounded-r-md"
                  }
                >
                  No
                </span>
              )}
            </RadioGroup.Option>
          </div>
        </div>
      </RadioGroup>
      <Link href={`/account/purchases/${order.id}#order-${order.id}-feedback`}>
        <a className="text-sm underline text-info hover:text-primary">
          Leave Feedback
        </a>
      </Link>
    </div>
  );
}

export default function OrderFeedbackForm({
  order,
}: OrderFeedbackFormProps): JSX.Element {
  const { data: session, status } = useSession();
  const sessionLoading = status === "loading";
  const orderFeedbackSchema = Yup.object().shape({
    feedback: Yup.string()
      .min(1)
      .max(10000)
      .required("Feedback cannot be blank"),
  });
  const disabled = order.aasm_state == "reserved";

  if (sessionLoading) return <Spinner text="Loading..." />;

  return (
    <Formik
      initialValues={{
        recommend: undefined,
        feedback: order.review?.feedback,
      }}
      validationSchema={orderFeedbackSchema}
      onSubmit={(values, actions) => {
        OrderApi(session?.accessToken)
          .review(`${order.id}`, null, values.feedback)
          .then(() => {
            mutate([
              `orders/${order.id}?relation=purchases`,
              session?.accessToken,
            ]);
            toast.success("Feedback submitted");
          })
          .catch((error) => {
            toast.error(
              error.response.data.error ||
                "There was an error submitting feedback."
            );
          })
          .finally(() => {
            actions.setSubmitting(false);
          });
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form id={`order-${order.id}-feedback`}>
            <div className="space-y-2 ">
              <TextAreaFull
                label="How was your experience?"
                name="feedback"
                placeholder="Add feedback (optional)"
                disabled={disabled}
              />
            </div>
            <SubmitButton
              text="Save Feedback"
              submitting={isSubmitting}
              disabled={disabled}
            />
          </Form>
        );
      }}
    </Formik>
  );
}
