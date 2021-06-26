import Link from "next/link";

interface Props {
  disabled?: boolean;
  hidden?: boolean;
  text: string;
  onClick?: () => Promise<void>;
}

interface PropsWithHref extends Props {
  href: string;
}

export const CTAButton = (props: PropsWithHref): JSX.Element => {
  return (
    <Link href={props.href} passHref>
      <button
        type="submit"
        className="p-2 text-xl font-medium rounded-md text-accent-lightest bg-info disabled:bg-info-light hover:bg-info-dark"
        disabled={props.disabled}
        hidden={props.hidden}
      >
        {props.text}
      </button>
    </Link>
  );
};

export const PrimaryButton = (props: PropsWithHref): JSX.Element => {
  return (
    <Link href={props.href} passHref>
      <button
        type="submit"
        className="px-2 py-1 my-1 font-medium rounded-md text-accent-lightest bg-primary disabled:bg-primary-light hover:bg-primary-dark"
        disabled={props.disabled}
        hidden={props.hidden}
      >
        {props.text}
      </button>
    </Link>
  );
};

export const PrimaryButtonFull = (props: PropsWithHref): JSX.Element => {
  return (
    <Link href={props.href} passHref>
      <button
        type="submit"
        className="w-full px-2 py-1 my-1 font-medium rounded-md text-accent-lightest bg-primary disabled:bg-primary-light hover:bg-primary-dark"
        disabled={props.disabled}
        hidden={props.hidden}
      >
        {props.text}
      </button>
    </Link>
  );
};

export const SecondaryButton = (props: PropsWithHref): JSX.Element => {
  return (
    <Link href={props.href} passHref>
      <button
        type="button"
        className="px-2 py-1 my-1 font-medium border rounded-md border-info text-info bg-info-lightest disabled:bg-info-lighter hover:bg-info-lighter"
        disabled={props.disabled}
        hidden={props.hidden}
      >
        {props.text}
      </button>
    </Link>
  );
};

export const SecondaryButtonFull = (props: PropsWithHref): JSX.Element => {
  return (
    <Link href={props.href} passHref>
      <button
        type="button"
        className="w-full px-2 py-1 my-1 font-medium border rounded-md border-info text-info bg-info-lightest disabled:bg-info-lighter hover:bg-info-lighter"
        disabled={props.disabled}
        hidden={props.hidden}
      >
        {props.text}
      </button>
    </Link>
  );
};

export const SubmitButton = (props: Props): JSX.Element => {
  return (
    <button
      type="submit"
      className="px-2 py-1 my-1 font-medium rounded-md bg-primary text-accent-lightest hover:bg-primary-dark disabled:bg-primary-light"
      onClick={props.onClick}
      disabled={props.disabled}
      hidden={props.hidden}
    >
      {props.text}
    </button>
  );
};

export const SecondarySubmitButton = (props: Props): JSX.Element => {
  return (
    <button
      type="submit"
      className="px-2 py-1 my-1 font-medium border rounded-md border-info bg-info-lightest text-info hover:bg-info-lighter disabled:bg-info-lighter"
      onClick={props.onClick}
      disabled={props.disabled}
      hidden={props.hidden}
    >
      {props.text}
    </button>
  );
};

export const SubmitButtonFull = (props: Props): JSX.Element => {
  return (
    <button
      type="submit"
      className="w-full px-2 py-2 my-1 font-medium rounded-md bg-primary text-accent-lightest hover:bg-primary-dark disabled:bg-primary-light"
      onClick={props.onClick}
      disabled={props.disabled}
      hidden={props.hidden}
    >
      {props.text}
    </button>
  );
};

export const DeleteButton = (props: Props): JSX.Element => {
  return (
    <button
      type="submit"
      className="px-2 py-1 my-1 font-medium border rounded-md border-error bg-error-lightest text-error hover:bg-error-lighter disabled:bg-error-lighter"
      onClick={props.onClick}
      disabled={props.disabled}
      hidden={props.hidden}
    >
      {props.text}
    </button>
  );
};

export const ResetButton = (props: Props): JSX.Element => {
  return (
    <button
      type="reset"
      className="px-2 py-1 my-1 font-medium underline text-info disabled:text-accent"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};
