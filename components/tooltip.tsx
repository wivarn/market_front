export interface Props {
  text: string;
}

export function ToolTipBelow(props: Props): JSX.Element {
  return (
    <div className="absolute z-10 items-center hidden group-hover:grid -inset-4 top-12 grid-col-auto">
      <span className="z-20 px-1 py-1 text-sm font-semibold text-center text-white rounded-full whitespace-nowrap bg-accent-darker">
        {props.text}
      </span>
      <div className="w-3 h-3 mx-auto -mt-12 rotate-45 bg-accent-darker" />
    </div>
  );
}

export function ToolTipAbove(props: Props): JSX.Element {
  return (
    <div className="absolute z-10 items-center hidden bottom-14 group-hover:grid -inset-6 grid-col-auto">
      <span className="z-20 px-1 py-1 text-sm font-semibold text-center text-white rounded-full whitespace-nowrap bg-accent-darker">
        {props.text}
      </span>
      <div className="w-3 h-3 mx-auto -mt-2 rotate-45 bg-accent-darker" />
    </div>
  );
}
