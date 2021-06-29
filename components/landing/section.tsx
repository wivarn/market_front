import React, { ReactNode } from "react";

type Props = {
  title?: string;
  description?: string;
  yPadding?: string;
  children: ReactNode;
};

const PageSection = (props: Props): JSX.Element => (
  <div
    className={`max-w-screen-xl mx-auto px-8 ${
      props.yPadding ? props.yPadding : "py-16"
    }`}
  >
    {(props.title || props.description) && (
      <div className="mb-12 text-center">
        {props.title && (
          <h2 className="text-4xl font-semibold text-accent-darker">
            {props.title}
          </h2>
        )}
        {props.description && (
          <div className="mt-4 text-2xl text-accent-dark md:px-20">
            {props.description}
          </div>
        )}
      </div>
    )}

    {props.children}
  </div>
);

export { PageSection };
