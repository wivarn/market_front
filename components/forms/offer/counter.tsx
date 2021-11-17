import * as Yup from "yup";

import { Dialog, Transition } from "@headlessui/react";
import { Form, Formik } from "formik";
import { Fragment, useContext, useState } from "react";
import { ResetButton, SubmitButton } from "components/buttons";

import { CurrencyFieldFull } from "../fields";
import { IOfferDetailed } from "types/offer";
import { OfferApi } from "services/backendApi/offer";
import { UserSettingsContext } from "contexts/userSettings";
import { toast } from "react-toastify";
import { uniqueId } from "lodash";
import { useSession } from "next-auth/client";

export default function ListingCounterOfferModal(
  props: IOfferDetailed
): [JSX.Element, JSX.Element] {
  const [session] = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const { updateOffers } = useContext(UserSettingsContext);

  const sellerSchema = {
    amount: Yup.number()
      .min(1, "Must at least 1.00")
      .lessThan(
        Number(props.listing.price),
        "Must be less than the listing price"
      )
      .moreThan(Number(props.amount), "Must be more than current offer")
      .required(),
  };
  const buyerSchema = {
    amount: Yup.number()
      .min(1, "Must at least 1.00")
      .lessThan(
        Number(props.listing.price),
        "Must be less than the listing price"
      )
      .lessThan(Number(props.amount), "Must be less than current offer")
      .required(),
  };
  const offerSchema = Yup.object().shape(
    props.counter ? buyerSchema : sellerSchema
  );

  async function closeModal() {
    setModalOpen(false);
  }

  return [
    <a key={uniqueId("toggle")} onClick={async () => setModalOpen(true)}>
      {props.counter ? "New" : "Counter"} Offer
    </a>,
    <Transition key={uniqueId("modal")} appear show={modalOpen} as={Fragment}>
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
                Submit {props.counter ? "New" : "Counter"} Offer
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-accent-darker">
                  {props.counter
                    ? "Submit a new offer for this item to the seller. If accepted,\
                    you are obligated to pay within 48 hours. Failure to pay for\
                    the item could result in suspension of your account."
                    : "Submit a counter offer for this item. If accepted they are\
                    obligated to pay for the item within 48 hours."}
                </p>
                <p className="mt-2 text-xs text-accent-dark">
                  Offers automatically expire in 48 hours
                </p>
              </div>

              <Formik
                initialValues={{}}
                validationSchema={offerSchema}
                onSubmit={(values: { amount?: number }) => {
                  const request = props.counter
                    ? OfferApi(session?.accessToken).create(
                        props.listing.id,
                        Number(values.amount)
                      )
                    : OfferApi(session?.accessToken).createCounter(
                        props.id,
                        Number(values.amount)
                      );
                  request
                    .then(() => {
                      toast.success("Counter offer sent.");
                      closeModal();
                      updateOffers(session?.accessToken);
                    })
                    .catch(() => {
                      toast.error("Error submitting counter offer.");
                    });
                }}
              >
                {(formik) => (
                  <Form>
                    <div className="mt-2">
                      <CurrencyFieldFull
                        name="amount"
                        label="Offer Amount"
                        placeholder="0"
                        currency={props.listing.currency}
                      />
                    </div>
                    <div className="mt-2 space-x-2">
                      <SubmitButton
                        submitting={formik.isSubmitting}
                        text="Submit Offer"
                      />
                      <ResetButton onClick={closeModal} text="Cancel" />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>,
  ];
}
