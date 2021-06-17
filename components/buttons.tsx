import Link from "next/link";

interface Props {
  disabled?: boolean;
  text: string;
  onClick?: () => Promise<void>;
  tooltip?: string;
}

interface PropsWithHref extends Props {
  href: string;
}

export const PrimaryButton = (props: PropsWithHref) => {
  if (props.disabled) {
    return (
      <button
        type="reset"
        className="px-2 py-1 my-1 font-medium rounded-md bg-primary-light text-secondary-lightest"
        disabled={props.disabled}
      >
        {props.text}
      </button>
    );
  }
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
  if (props.disabled) {
    return (
      <button
        type="reset"
        className="px-2 py-1 my-1 font-medium border rounded-md border-info text-info bg-info-lighter"
        disabled={props.disabled}
      >
        {props.text}
        <ToolTip text={props.tooltip} />
      </button>
    );
  }
  return (
    <Link href={props.href} passHref>
      <a>
        <button
          type="button"
          className="px-2 py-1 my-1 font-medium border rounded-md border-info text-info bg-info-lightest hover:bg-info-lighter"
          disabled={props.disabled}
        >
          {props.text}
        </button>
      </a>
    </Link>
  );
};

export const SubmitButton = (props: Props) => {
  if (props.disabled) {
    return (
      <button
        type="submit"
        className="px-2 py-1 my-1 font-medium rounded-md bg-primary-light text-accent-lightest"
        disabled={props.disabled}
      >
        {props.text}
        <ToolTip text={props.tooltip} />
      </button>
    );
  }
  return (
    <button
      type="submit"
      className="px-2 py-1 my-1 font-medium rounded-md bg-primary text-accent-lightest hover:bg-primary-dark"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export const SecondarySubmitButton = (props: Props) => {
  if (props.disabled) {
    return (
      <button
        type="submit"
        className="px-2 py-1 my-1 font-medium border rounded-md border-info bg-info-lighter text-info"
        disabled={props.disabled}
      >
        {props.text}
        <ToolTip text={props.tooltip} />
      </button>
    );
  }
  return (
    <button
      type="submit"
      className="px-2 py-1 my-1 font-medium border rounded-md border-info bg-info-lightest text-info hover:bg-info-lighter"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export const SubmitButtonFull = (props: Props) => {
  if (props.disabled) {
    return (
      <button
        type="submit"
        className="px-2 py-1 my-1 font-medium rounded-md bg-primary-light text-accent-lightest"
        disabled={props.disabled}
      >
        {props.text}
        <ToolTip text={props.tooltip} />
      </button>
    );
  }
  return (
    <button
      type="submit"
      className="w-full px-2 py-2 my-1 font-medium rounded-md bg-primary text-accent-lightest hover:bg-primary-dark"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export const DeleteButton = (props: Props) => {
  if (props.disabled) {
    return (
      <button
        type="submit"
        className="px-2 py-1 my-1 font-medium border rounded-md border-error bg-error-lighter text-error"
        disabled={props.disabled}
      >
        {props.text}
        <ToolTip text={props.tooltip} />
      </button>
    );
  }
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
