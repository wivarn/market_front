import React, { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import { SmInfoCircle } from "components/icons";

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
    <div className="container mt-8">
      <div className="grid items-center max-w-xl p-4 mx-auto rounded-md ">
        <Image src="/assets/error.svg" height={400} width={400} />
        <div className="mt-4 text-lg text-center">
          <span>
            Well that's embarrassing! It looks like something went wrong. Please
            try again, or{" "}
            <Link href="#">
              <a className="underline text-info">contact support.</a>
            </Link>
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
        <Image src="/assets/create.svg" height={400} width={400} />
        <div className="mt-4 text-lg text-center">{props.children}</div>
      </div>
    </div>
  );
}
