import * as Yup from "yup";

import { Form, Formik } from "formik";
import { TextField, Toggle } from "../fields";
import { useEffect, useState } from "react";

import { IOrder } from "types/order";
import { OrderApi } from "services/backendApi/order";
import { RadioGroup } from "@headlessui/react";
import { Spinner } from "components/spinner";
import { SubmitButton } from "components/buttons";
import { mutate } from "swr";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

interface IProps {
  order: IOrder;
}

export function OrderFeedbackMini({ order }: IProps): JSX.Element {
  const { data: session, status } = useSession();
  const sessionLoading = status === "loading";
  const [recommend, setRecommend] = useState<boolean | null>(order.recommend);

  useEffect(() => {
    console.log("form state: ", recommend);
    console.log("order state: ", order.recommend);

    if (recommend === order.recommend) return;

    OrderApi(session?.accessToken)
      .feedback(`${order.id}`, recommend, null)
      .then(() => {
        mutate([`orders/${order.id}?relation=purchases`, session?.accessToken]);
        toast.success("Feedback submitted");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }, [recommend]);

  if (sessionLoading) return <Spinner text="Loading..." />;

  return (
    <RadioGroup value={recommend} onChange={setRecommend}>
      <div className="flex items-center space-x-2">
        <RadioGroup.Label>
          <p className="text-sm">Do you recommend this seller?</p>
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
  );
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
