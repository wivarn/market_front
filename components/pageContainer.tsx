import React, { ReactNode } from "react";

type Props = {
  yPadding?: string;
  children: ReactNode;
};

export default function PageContainer(props: Props): JSX.Element {
  return (
    <div
      className={`max-w-screen-2xl relative container flex-grow mx-auto px-4 bg-white rounded-md ${
        props.yPadding ? props.yPadding : "py-8"
      }`}
    >
      {props.children}
    </div>
  );
}
