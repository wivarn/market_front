import { SpinnerIcon, SpinnerIconLg, SpinnerIconXs } from "components/icons";

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

export function SpinnerXs(props: Props): JSX.Element {
  return (
    <div className="flex items-center animate-pulse">
      <SpinnerIconXs />
      {props.text ? (
        <span className="px-2 text-xl text-accent-darker">{props.text}</span>
      ) : null}
    </div>
  );
}

export function ImageSpinner(): JSX.Element {
  return (
    <div className="absolute inset-0 flex items-center p-2 animate-pulse">
      <SpinnerIconLg />
    </div>
  );
}

export function SpinnerLg(props: Props): JSX.Element {
  return (
    <div className="flex justify-center m-auto h-96">
      <div className="flex items-center p-2 animate-pulse">
        <SpinnerIconLg />
        {props.text ? (
          <span className="px-2 text-2xl text-accent-darker">{props.text}</span>
        ) : null}
      </div>
    </div>
  );
}
