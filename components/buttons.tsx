import Link from "next/link";

interface Props {
  disabled?: boolean;
  text: string;
  onClick?: () => Promise<void>;
}

interface PropsWithHref extends Props {
  href: string;
}

export const PrimaryButton = (props: PropsWithHref) => {
  return (
    <Link href={props.href} passHref>
      <a>
        <button
          type="button"
          className="px-2 py-1 my-1 font-medium rounded-md bg-primary text-secondary-lightest hover:bg-primary-dark"
          disabled={props.disabled}
        >
          {props.text}
        </button>
      </a>
    </Link>
  );
};

export const SecondaryButton = (props: PropsWithHref) => {
  return (
    <Link href={props.href} passHref>
      <a>
        <button
          type="button"
          className="px-2 py-1 my-1 font-medium border-2 rounded-md border-info text-info bg-info-lightest hover:bg-info-lighter"
          disabled={props.disabled}
        >
          {props.text}
        </button>
      </a>
    </Link>
  );
};

export const SubmitButton = (props: Props) => {
  return (
    <button
      type="submit"
      className="px-2 py-1 my-1 font-medium rounded bg-primary text-accent-lightest hover:bg-primary-dark"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export const SubmitButtonFull = (props: Props) => {
  return (
    <button
      type="submit"
      className="w-full px-2 py-2 my-1 font-medium rounded bg-primary text-accent-lightest hover:bg-primary-dark"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export const DeleteButton = (props: Props) => {
  return (
    <button
      type="submit"
      className="px-2 py-1 my-1 font-medium border rounded-md border-error bg-error-lightest text-error hover:bg-error-lighter"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};
