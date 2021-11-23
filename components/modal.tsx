import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { PrimaryButton, SecondaryButton } from "./buttons";

import { toast } from "react-toastify";
import { uniqueId } from "lodash";

interface IProps {
  modalToggle: JSX.Element | string;
  title?: JSX.Element | string;
  body: JSX.Element | string;
  submitText?: string;
  submitAction?: () => Promise<void>;
  submitSuccessText?: string;
  submitErrorText?: string;
  cancelText?: string;
}

export default function Modal({
  modalToggle,
  title,
  body,
  submitText,
  submitAction,
  submitSuccessText,
  submitErrorText,
  cancelText,
}: IProps): [JSX.Element, JSX.Element] {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = async () => {
    setModalOpen(true);
  };

  const closeModal = async () => {
    setModalOpen(false);
  };

  const submitModal = async () => {
    if (submitAction) {
      submitAction()
        .then(() => {
          toast.success(submitSuccessText || "Success");
          closeModal();
        })
        .catch(() => {
          toast.error(submitErrorText || "Error");
          closeModal();
        });
    } else {
      closeModal();
    }
  };

  return [
    <a key={uniqueId("toggle")} onClick={openModal}>
      {modalToggle}
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
                {title}
              </Dialog.Title>
              <div className="mt-2 text-sm text-accent-darker">{body}</div>

              <div className="mt-2 space-x-2">
                <PrimaryButton
                  text={submitText || "Submit"}
                  onClick={submitModal}
                />
                <SecondaryButton
                  onClick={closeModal}
                  text={cancelText || "Cancel"}
                />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>,
  ];
}
