import React, { ReactNode } from "react";

interface Props {
  icon: ReactNode;
}

export const IconButton = (props: Props): JSX.Element => {
  return (
    <div className="relative flex flex-col items-center group">
      <a className="rounded-full text-primary group-hover:text-primary-darker">
        {props.icon}
      </a>
    </div>
  );
};
