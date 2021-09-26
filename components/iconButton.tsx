import React, { ReactNode } from "react";

import Link from "next/link";

interface LinkProps {
  icon: ReactNode;
  url: string;
  target?: string;
}

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

export const IconButtonLinkLight = (props: LinkProps): JSX.Element => {
  return (
    <div className="group">
      <div className="text-accent-light hover:text-accent-lightest">
        <Link href={props.url}>
          <a target={props.target}>{props.icon}</a>
        </Link>
      </div>
    </div>
  );
};
