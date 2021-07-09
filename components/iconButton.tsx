import React, { ReactNode } from "react";

import Link from "next/link";
import { ToolTipAbove } from "components/tooltip";

interface ButtonProps {
  icon: ReactNode;
  disabled?: boolean;
  tooltip?: string;
}

interface LinkProps {
  icon: ReactNode;
  url: string;
  target?: string;
}

export const IconButton = (props: ButtonProps): JSX.Element => {
  return (
    <div className="group">
      <button
        className="relative items-center p-1 border rounded-md disabled:cursor-not-allowed disabled:opacity-50 border-accent group-hover:border-primary text-accent-darker group-hover:text-primary"
        disabled={props.disabled}
      >
        {props.icon}
      </button>
      {props.tooltip ? <ToolTipAbove text={props.tooltip} /> : null}
    </div>
  );
};

export const IconButtonLink = (props: LinkProps): JSX.Element => {
  return (
    <div className="group">
      <div className="text-accent-darker hover:text-primary">
        <Link href={props.url}>
          <a target={props.target}>{props.icon}</a>
        </Link>
      </div>
    </div>
  );
};
