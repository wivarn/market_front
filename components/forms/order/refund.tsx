import * as Yup from "yup";

import { DropdownCombobox, NumberField, TextField } from "../fields";
import { Form, Formik } from "formik";

import FormContainer from "../container";
import { GenericErrorMessage } from "components/message";
import { IDropdownOption } from "types/form";
import { IOrder } from "types/order";
import { OrderApi } from "services/backendApi/order";
import { SpinnerLg } from "components/spinner";
import { SubmitButtonFull } from "components/buttons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useState } from "react";

export const reasonList: IDropdownOption[] = [
  { value: "requested_by_customer", text: "Requested By Customer" },
  { value: "duplicate", text: "Duplicate" },
  { value: "fraudulent", text: "Draudulent" },
  { value: "", text: "Other" },
];

interface IProps {
  order: IOrder;
}

export default function OrderRefundForm({ order }: IProps): JSX.Element {
  const router = useRouter();
  const [session, sessionLoading] = useSession();
  const [error, setError] = useState(false);

  const refundOrderSchema = Yup.object().shape({
    amount: Yup.number()
      .min(0.01, "Price must more than 0.01")
      .max(
        Number(order.total),
        `Price must be less than ${Number(order.total)}`
      ),
    reason: Yup.mixed().oneOf(
      reasonList.map((reason): string | null => {
        return reason.value;
      })
    ),
    notes: Yup.mixed().when("reason", (reason, schema) => {
      if (reason == null) {
        return schema.required("Notes is required when reason is 'Other'");
      }
    }),
  });

  if (sessionLoading || !router.isReady) return <SpinnerLg text="Loading..." />;
  if (error) return <GenericErrorMessage />;

  return (
    <FormContainer>
      <Formik
        initialValues={{
          amount: 0,
          reason: "",
        }}
        validationSchema={refundOrderSchema}
        onSubmit={(values, actions) => {
          OrderApi(session?.accessToken)
            .refund(`${router.query.id}`, values)
            .then(() => {
              toast.success("Refund request submitted");
            })
            .catch((error) => {
              toast.error(error.response.data.error);
              setError(true);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {(formik) => (
          <Form id={`refund-${router.query.id}`}>
            <div className="my-2 space-y-2">
              <h5 className="text-center text-accent-darker">Offer a Refund</h5>

              <NumberField name="amount" label="Amount" />
              <DropdownCombobox name="reason" items={reasonList} />
              <TextField name="notes" label="Notes" />

              <SubmitButtonFull
                text="Refund"
                submitting={formik.isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
