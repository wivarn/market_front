import * as Yup from "yup";

import { Form, Formik } from "formik";
import { IOrder, IOrderDetails } from "types/order";
import { useEffect, useState } from "react";

import { InfoCircleXs } from "components/icons";
import Link from "next/link";
import { OrderApi } from "services/backendApi/order";
import { RadioGroup } from "@headlessui/react";
import ReactTooltip from "react-tooltip";
import { Spinner } from "components/spinner";
import { SubmitButton } from "components/buttons";
import { TextAreaFull } from "../fields";
import { mutate } from "swr";
import { sub } from "date-fns";
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
  const reviewLocked =
    order.review &&
    new Date(order.review.created_at) < sub(Date.now(), { days: 14 });
  const disabled = order.aasm_state == "reserved" || reviewLocked;

  useEffect(() => {
    if (recommend === order.review?.recommend) return;

    OrderApi(session?.accessToken)
      .review(`${order.id}`, recommend, null)
      .then((response) => {
        order.review = response.data.review;
        mutate([`orders/${order.id}?relation=purchases`, session?.accessToken]);
        toast.success("Feedback submitted");
      })
      .catch((error) => {
        setRecommend(order.review?.recommend);
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
                      ? "bg-success-lightest border rounded-l-md border-success px-2 disabled:bg-success-lighter"
                      : "rounded-l-md border px-2 bg-accent-lightest disabled:bg-accent-lighter"
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
          <span data-tip data-for={`order-${order.id}-locked-30days`}>
            <InfoCircleXs />
            <ReactTooltip
              id={`order-${order.id}-locked-30days`}
              type="dark"
              wrapper="span"
              place="bottom"
              effect="solid"
              multiline={true}
            >
              <div className="text-center">
                Reviews are locked 30 days <br /> after purchase
              </div>
            </ReactTooltip>
          </span>
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
    feedback: Yup.string().max(10000).nullable(),
  });
  const recommendNotSet = order.review?.recommend == null;
  const reviewLocked =
    order.review &&
    new Date(order.review.created_at) < sub(Date.now(), { days: 14 });
  const disabled =
    order.aasm_state == "reserved" || recommendNotSet || reviewLocked;

  if (sessionLoading) return <Spinner text="Loading..." />;

  return (
    <Formik
      initialValues={{
        feedback: order.review?.feedback || undefined,
      }}
      validationSchema={orderFeedbackSchema}
      onSubmit={(values, actions) => {
        OrderApi(session?.accessToken)
          .review(`${order.id}`, null, values.feedback || null)
          .then(() => {
            toast.success("Feedback submitted");
          })
          .catch((error) => {
            actions.setFieldValue("feedback", order.review?.feedback || "");
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
      {(formik) => {
        return (
          <Form id={`order-${order.id}-feedback`}>
            <div
              data-tip
              data-for={`order-${order.id}-recommend-not-set`}
              className=""
            >
              <div className="space-y-2">
                <div className="flex space-x-1">
                  <p className="text-sm text-accent-darker">
                    How was your experience?
                  </p>
                  <span data-tip data-for={`order-${order.id}-locked-30days`}>
                    <InfoCircleXs />
                    <ReactTooltip
                      id={`order-${order.id}-locked-30days`}
                      type="dark"
                      wrapper="span"
                      place="bottom"
                      effect="solid"
                      multiline={true}
                    >
                      <div className="text-center">
                        Reviews are locked 30 days <br /> after purchase
                      </div>
                    </ReactTooltip>
                  </span>
                </div>
                <TextAreaFull
                  name="feedback"
                  placeholder="Add feedback (optional)"
                  disabled={disabled}
                />
              </div>
              <SubmitButton
                text="Save Feedback"
                submitting={formik.isSubmitting}
                disabled={disabled || !formik.values.feedback}
              />
              <ReactTooltip
                id={`order-${order.id}-recommend-not-set`}
                type="dark"
                wrapper="span"
                place="bottom"
                effect="solid"
                multiline={true}
                disable={!recommendNotSet}
              >
                <div className="text-center">
                  You must select recommend yes or no <br /> prior to leaving
                  feedback
                </div>
              </ReactTooltip>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
