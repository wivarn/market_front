import React from "react";

type Props = {
  title?: string;
  description?: string;
  yPadding?: string;
};

export function Highlight(props: Props): JSX.Element {
  return (
    <div
      className={`max-w-screen-lg mx-auto px-3 ${
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
            <div className="mt-4 text-xl text-accent-dark md:px-20">
              {props.description}
            </div>
          )}
        </div>
      )}
    </div>
  );
}