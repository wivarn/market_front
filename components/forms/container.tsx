import { RefObject } from "react";

interface IPorps {
  children: React.ReactNode;
  formRef?: RefObject<any>;
}

export default function FormContainer(props: IPorps): JSX.Element {
  return (
    <div
      ref={props.formRef}
      className="container max-w-lg p-2 px-4 mx-auto mt-8 mb-8 border rounded-md bg-accent-lightest border-accent-light"
    >
      {props.children}
    </div>
  );
}
