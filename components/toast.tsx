import "react-toastify/dist/ReactToastify.min.css";

import { ToastContainer, ToastProps } from "react-toastify";

import { HiX } from "react-icons/hi";

const toastContextClass = {
  success: "bg-success",
  error: "bg-error",
  info: "bg-accent",
  warning: "bg-error-light",
  default: "bg-primary",
  dark: "bg-accent-darkest",
};

const bodyContextClass = {
  success: "text-success-lightest",
  error: "text-error-lightest",
  info: "text-accent-darkest",
  warning: "text-error-darkest",
  default: "text-primary-lightest",
  dark: "text-accent-lightest",
};

const progressContextClass = {
  success: "!bg-success-dark",
  error: "!bg-error-dark",
  info: "!bg-accent-dark",
  warning: "!bg-error-dark",
  default: "!bg-primary-dark",
  dark: "!bg-accent-light",
};

const closeButton = (props: ToastProps) => (
  <HiX
    className={`icon-sm ${bodyContextClass[props.type || "default"]}`}
    onClick={props.closeToast}
  ></HiX>
);

export default function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={120000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      toastClassName={(options) =>
        toastContextClass[options?.type || "default"] +
        " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
      }
      bodyClassName={(options) =>
        bodyContextClass[options?.type || "default"] + " p-1.5"
      }
      progressClassName={(options) =>
        progressContextClass[options?.type || "default"] +
        " Toastify__progress-bar Toastify__progress-bar--animated"
      }
      closeButton={closeButton}
    />
  );
}
