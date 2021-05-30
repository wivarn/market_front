import React, { ReactNode } from "react";

import Link from "next/link";

interface Props {
  href: string;
  icon: ReactNode;
  text: string;
}

export const IconLink: React.FC<Props> = (props) => {
  return (
    <Link href={props.href}>
      <a className="text-primary hover:text-primary-dark">
        {props.icon}
        <div className="text-sm font-semibold text-center">{props.text}</div>
      </a>
    </Link>
  );
};
