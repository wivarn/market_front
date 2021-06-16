import React, { ReactNode } from "react";

import Link from "next/link";
import { ToolTip } from "components/tooltip";

interface Props {
  href?: string;
  icon: ReactNode;
  tooltip: string;
}

export const IconLink = (props: Props) => {
  const iconText = (
    <div className="relative flex flex-col items-center group">
      <a className="p-1 rounded-full text-accent-darker hover:text-primary ">
        {props.icon}
        <ToolTip text={props.tooltip} />
      </a>
    </div>
  );
  if (props.href) {
    return <Link href={props.href}>{iconText}</Link>;
  }
  return iconText;
};
