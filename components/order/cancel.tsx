import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { SecondaryButton, SubmitButton } from "components/buttons";

import { IOrder } from "types/order";
import { OrderApi } from "services/backendApi/order";
import { SpinnerXs } from "components/spinner";
import { toast } from "react-toastify";
import { useSession } from "next-auth/client";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  order: IOrder;
}
export default function CancelOrder({
  open,
  setOpen,
  order,
}: IProps): JSX.Element {
  const [session, SessionLoading] = useSession();
  const [submitting, setSubmitting] = useState(false);

  async function closeModal() {
    setOpen(false);
  }

  async function cancelOrder() {
    setSubmitting(true);
    OrderApi(session?.accessToken)
      .cancel(order.id)
      .then(() => {
        toast.success("Refund submitted");
      })
      .catch(() => {
        toast.error("Refund request failed");
      })
      .finally(() => {
        closeModal();
        setSubmitting(false);
      });
  }

  if (SessionLoading) return <SpinnerXs />;

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        id={`cancel-order-${order.id}`}
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
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
                Cancel Order
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-accent-darker">
                  Are you sure you want to cancel this order? A full refund of{" "}
                  {Number(order.total).toLocaleString("en", {
                    style: "currency",
                    currency: "usd",
                  })}{" "}
                  {order.currency} will be issued to the buyer. This action
                  cannot be undone.
                </p>
              </div>

              <div className="space-x-2">
                <SubmitButton
                  onClick={cancelOrder}
                  submitting={submitting}
                  text="Ok"
                />
                <SecondaryButton onClick={closeModal} text="Cancel" />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
