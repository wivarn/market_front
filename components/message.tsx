import React, { ReactNode } from "react";

import Image from "next/image";
import { InfoCircleSm } from "components/icons";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

export function InfoMessage(props: Props): JSX.Element {
  return (
    <div className="flex p-2 border rounded-md border-info bg-info-lightest">
      <div className="mr-2 ">
        <InfoCircleSm />
      </div>
      {props.children}
    </div>
  );
}

export function GenericErrorMessage(): JSX.Element {
  return (
    <div className="container mt-8">
      <div className="grid items-center max-w-xl p-4 mx-auto rounded-md ">
        <Image src="/assets/error.svg" height={400} width={400} />
        <div className="mt-4 text-lg text-center">
          <span>
            Well that is embarrassing! It looks like something went wrong.
            Please try again, or{" "}
            <a
              href="https://skwirl.zendesk.com/hc/en-us/requests/new"
              rel="noreferrer"
              target="_blank"
              className="underline text-info"
            >
              contact support.
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export function BlankMessage(props: Props): JSX.Element {
  return (
    <div className="container mt-8">
      <div className="grid items-center max-w-xl p-4 mx-auto rounded-md ">
        <Image src="/assets/blank.svg" height={400} width={400} />
        <div className="mt-4 text-lg text-center">{props.children}</div>
      </div>
    </div>
  );
}
