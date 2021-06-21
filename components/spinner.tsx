import { LgSpinnerIcon, SpinnerIcon } from "components/icons";

export interface Props {
  text?: string;
}

export function Spinner(props: Props): JSX.Element {
  return (
    <div className="flex items-center p-2 animate-pulse">
      <SpinnerIcon />
      {props.text ? (
        <span className="px-2 text-xl text-accent-darker">{props.text}</span>
      ) : null}
    </div>
  );
}

export function SpinnerLg(props: Props): JSX.Element {
  return (
    <div className="flex justify-center m-auto h-96">
      <div className="flex items-center p-2 animate-pulse">
        <LgSpinnerIcon />
        <span className="px-2 text-2xl text-accent-darker">{props.text}</span>
      </div>
    </div>
  );
}
