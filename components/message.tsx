import React, { ReactNode } from "react";
import { SmInfoCircle } from "components/icons";

type Props = {
  children: ReactNode;
};

export default function InfoMessage(props: Props): JSX.Element {
  return (
    <div className="flex p-2 border rounded-md border-info bg-info-lightest">
      <div className="mr-2 ">
        <SmInfoCircle />
      </div>
      {props.children}
    </div>
  );
}
