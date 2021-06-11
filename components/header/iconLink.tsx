import React, { ReactNode } from "react";

import Link from "next/link";

interface Props {
  href?: string;
  icon: ReactNode;
  text?: string;
}

export const IconLink = (props: Props) => {
  const iconText = (
    <a className="py-2 text-center align-middle rounded text-accent-darker hover:text-primary">
      {props.icon}
      <div className="text-sm font-medium">{props.text}</div>
    </a>
  );

  if (!props.href) {
    return iconText;
  }
  return <Link href={props.href}>{iconText}</Link>;
};
