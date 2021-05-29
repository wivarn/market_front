import React, { ReactNode } from "react";

import Link from "next/link";

interface Props {
  href: string;
  icon: ReactNode;
  text: string;
}

export const IconLink = (props: Props) => {
  return (
    <Link href={props.href}>
      <a className="py-2 text-center rounded text-primary hover:text-primary-light">
        {props.icon}
        <div className="text-sm font-semibold text-center">{props.text}</div>
      </a>
    </Link>
  );
};
