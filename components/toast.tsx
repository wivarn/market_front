import "react-toastify/dist/ReactToastify.min.css";

import { Slide, ToastContainer, ToastProps } from "react-toastify";

import { HiX } from "react-icons/hi";

const toastContextClass = {
  success: "bg-success-lightest border-success",
  error: "bg-error-lightest border-error",
  info: "bg-info-lightest border-info",
  warning: "bg-warning-lightest border-warning",
  default: "bg-primary-lightest border-primary",
  dark: "bg-accent-darker border-accent-lighter",
};

const bodyContextClass = {
  success: "text-accent-darkest",
  error: "text-accent-darkest",
  info: "text-accent-darkest",
  warning: "text-accent-darkest",
  default: "text-accent-darkest",
  dark: "text-accent-lighter",
};

const progressContextClass = {
  success: "!bg-success",
  error: "!bg-error",
  info: "!bg-info",
  warning: "!bg-warning",
  default: "!bg-primary",
  dark: "!bg-accent-lighter",
};

const closeButton = (props: ToastProps) => (
  <HiX
    className={`icon-sm ${bodyContextClass[props.type || "default"]}`}
    onClick={props.closeToast}
  ></HiX>
);

export default function Toast(): JSX.Element {
  return (
    <ToastContainer
      position="top-center"
      transition={Slide}
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      toastClassName={(options) =>
        toastContextClass[options?.type || "default"] +
        " border relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
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
