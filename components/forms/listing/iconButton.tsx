import React, { ReactNode } from "react";

import { ToolTipAbove } from "components/tooltip";

interface Props {
  icon: ReactNode;
  tooltip: string;
}

export const IconButton = (props: Props): JSX.Element => {
  return (
    <div className="group">
      <div className="relative flex flex-col items-center rounded-full group text-primary group-hover:text-primary-dark">
        {props.icon}
      </div>
      <ToolTipAbove text={props.tooltip} />
    </div>
  );
};
