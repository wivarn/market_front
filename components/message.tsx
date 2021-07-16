import React, { ReactNode } from "react";
import Link from "next/link";
import { SmInfoCircle, SmErrorIcon } from "components/icons";

type Props = {
  children: ReactNode;
};

export function InfoMessage(props: Props): JSX.Element {
  return (
    <div className="flex p-2 border rounded-md border-info bg-info-lightest">
      <div className="mr-2 ">
        <SmInfoCircle />
      </div>
      {props.children}
    </div>
  );
}

export function GenericErrorMessage(): JSX.Element {
  return (
    <div className="container w-screen h-full">
      <div className="flex max-w-2xl p-2 mx-auto border rounded-md border-error bg-error-lightest">
        <div className="mr-2 ">
          <SmErrorIcon />
        </div>
        <span>
          Well that's embarrassing! It looks like something went wrong. Please
          try again, or{" "}
          <Link href="#">
            <a className="underline text-info">contact support.</a>
          </Link>
        </span>
      </div>
    </div>
  );
}
