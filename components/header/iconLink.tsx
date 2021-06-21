import React, { ReactNode } from "react";

import Link from "next/link";
import { ToolTipBelow } from "components/tooltip";

interface Props {
  href?: string;
  icon: ReactNode;
  tooltip: string;
}

export const IconLink = (props: Props): JSX.Element => {
  const iconText = (
    <div className="relative flex flex-col items-center group">
      <a
        href={props.href}
        className="p-1 rounded-full text-secondary-lightest group-hover:bg-info-lightest group-hover:text-info-darker"
      >
        {props.icon}
      </a>
      <ToolTipBelow text={props.tooltip} />
    </div>
  );
  if (props.href) {
    return <Link href={props.href}>{iconText}</Link>;
  }
  return iconText;
};
