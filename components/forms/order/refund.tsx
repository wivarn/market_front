import * as Yup from "yup";

import { CurrencyFieldFull, DropdownCombobox, TextFieldFull } from "../fields";
import { Dialog, Transition } from "@headlessui/react";
import { Form, Formik, FormikProps } from "formik";
import { Fragment, useState } from "react";
import {
  PrimaryButton,
  SecondaryButton,
  SubmitButton,
} from "components/buttons";

import FormContainer from "../container";
import { IOrderDetails } from "types/order";
import { OrderApi } from "services/backendApi/order";
import { SpinnerLg } from "components/spinner";
import { mutate } from "swr";
import { refundReasonList } from "constants/orders";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

interface IProps {
  order: IOrderDetails;
}

export default function OrderRefundForm({ order }: IProps): JSX.Element {
  const router = useRouter();
  const [session, sessionLoading] = useSession();
  const [modalOpen, setModalOpen] = useState(false);

  async function openModal(formik: FormikProps<any>) {
    formik.setTouched({ amount: true, reason: true, notes: true }, true);
    formik.validateForm().then((errors) => {
      if (!Object.entries(errors).length) setModalOpen(true);
    });
  }

  async function closeModal() {
    setModalOpen(false);
  }

  const refundOrderSchema = Yup.object().shape({
    amount: Yup.number()
      .min(0.01, "Refund must more than 0.01")
      .max(
        Number(order.total),
        `Refund cannot be more than $${Number(order.total)}`
      ),
    reason: Yup.mixed().oneOf(
      refundReasonList.map((reason): string | null => {
        return reason.value;
      })
    ),
    notes: Yup.mixed().when("reason", (reason, schema) => {
      if (reason == null) {
        return schema.required("Note is required when reason is 'Other'");
      }
    }),
  });

  if (sessionLoading || !router.isReady) return <SpinnerLg text="Loading..." />;

  function renderModal(formik: FormikProps<any>) {
    return (
      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-70"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-accent-darker"
                >
                  Confirm Refund
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-accent-darker">
                    Are you sure you want to refund{" "}
                    {Number(formik.values.amount).toLocaleString("en", {
                      style: "currency",
                      currency: "usd",
                    })}{" "}
                    {order.currency} for this order? This action cannot be
                    undone.
                  </p>
                </div>

                <div className="mt-2 space-x-2">
                  <SubmitButton
                    submitting={formik.isSubmitting}
                    onClick={formik.submitForm}
                    text="Refund"
                  />
                  <SecondaryButton onClick={closeModal} text="Go Back" />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  }

  return (
    <FormContainer>
      <Formik
        initialValues={{
          amount: 0,
          reason: "requested_by_customer",
        }}
        validationSchema={refundOrderSchema}
        onSubmit={(values, actions) => {
          OrderApi(session?.accessToken)
            .refund(`${router.query.id}`, values)
            .then(() => {
              mutate([
                `orders/${order.id}?relation=sales`,
                session?.accessToken,
              ]);
              toast.success("Refund request submitted");
              actions.resetForm();
            })
            .catch((error) => {
              toast.error(error.response.data.error);
            })
            .finally(() => {
              actions.setSubmitting(false);
              closeModal();
            });
        }}
      >
        {(formik) => (
          <Form id={`refund-${router.query.id}`}>
            <div className="my-2 space-y-2">
              <h5 className="text-center text-accent-darker">Offer a Refund</h5>

              <CurrencyFieldFull
                name="amount"
                label="Amount"
                placeholder="0"
                currency={order.currency}
              />
              <DropdownCombobox
                name="reason"
                label="Reason"
                items={refundReasonList}
              />
              <TextFieldFull name="notes" label="Note" />

              <PrimaryButton
                text="Refund Order"
                onClick={() => openModal(formik)}
                disabled={!formik.isValid}
              />

              {renderModal(formik)}
            </div>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}
