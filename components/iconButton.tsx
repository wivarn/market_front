import React, { ReactNode } from "react";

import Link from "next/link";
import { ToolTipAbove } from "components/tooltip";

interface ButtonProps {
  icon: ReactNode;
  tooltip: string;
}

interface LinkProps {
  icon: ReactNode;
  url: string;
  target?: string;
}

export const IconButton = (props: ButtonProps): JSX.Element => {
  return (
    <div className="group">
      <div className="relative flex flex-col items-center rounded-full group text-accent-darker group-hover:text-primary">
        {props.icon}
      </div>
      <ToolTipAbove text={props.tooltip} />
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
