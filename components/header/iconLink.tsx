import React, { ReactNode } from "react";

import Link from "next/link";

interface Props {
  href?: string;
  icon: ReactNode;
  text?: string;
}

export const IconLink = (props: Props) => {
  const iconText = (
    <div className="flex flex-col items-center group">
      <a className="p-1 rounded-full text-accent-darker hover:text-primary ">
        {props.icon}
      </a>
    </div>
  );

  if (!props.href) {
    return iconText;
  }
  return <Link href={props.href}>{iconText}</Link>;
};
