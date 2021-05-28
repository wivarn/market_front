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
      <a className="py-2 rounded text-center text-primary hover:text-primary-light">
        {props.icon}
        <div className="text-sm font-semibold text-center">{props.text}</div>
      </a>
    </Link>
  );
};
