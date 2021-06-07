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
          className="px-2 py-1 my-1 font-semibold border-2 rounded-md border-primary text-primary hover:border-primary-dark hover:text-primary-dark"
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

export const DeleteButton = (props: Props) => {
  return (
    <button
      type="submit"
      className="px-2 py-1 my-1 font-medium rounded-md bg-error text-accent-lightest hover:bg-error-dark"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};
