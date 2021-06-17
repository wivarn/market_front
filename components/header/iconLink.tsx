import React, { ReactNode } from "react";

import Link from "next/link";

interface Props {
  href?: string;
  icon: ReactNode;
  tooltip: string;
}

export const IconLink = (props: Props) => {
  const iconText = (
    <div className="relative flex flex-col items-center group">
      <a className="p-1 rounded-full text-secondary-lightest hover:text-info-lighter group-hover:bg-info-lightest group-hover:text-info-darker">
        {props.icon}
      </a>
    </div>
  );
  if (props.href) {
    return <Link href={props.href}>{iconText}</Link>;
  }
  return iconText;
};
