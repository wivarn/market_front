import React, { ReactNode } from "react";

import Link from "next/link";

interface Props {
  href?: string;
  icon: ReactNode;
}

export const IconLink = (props: Props): JSX.Element => {
  const iconText = (
    <div className="relative flex flex-col items-center group">
      <a
        href={props.href}
        className="p-1 rounded-full text-primary-lightest group-hover:text-white"
      >
        {props.icon}
      </a>
    </div>
  );
  if (props.href) {
    return <Link href={props.href}>{iconText}</Link>;
  }
  return iconText;
};
