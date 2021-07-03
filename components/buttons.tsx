import Link from "next/link";

interface Props {
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  hidden?: boolean;
  href?: string;
  onClick?: () => Promise<void>;
}

interface BaseButtonProps extends Props {
  buttonClassName: string;
}

export const CTAButton = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      buttonClassName="p-2 text-2xl font-semibold rounded-md text-accent-lightest bg-primary disabled:bg-primary-light hover:bg-primary-dark"
    />
  );
};

export const PrimaryButton = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      buttonClassName="px-2 py-1 my-1 font-semibold rounded-md text-accent-lightest bg-primary disabled:bg-primary-light hover:bg-primary-dark"
    />
  );
};

export const PrimaryButtonFull = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      buttonClassName="w-full px-2 py-1 my-1 font-semibold rounded-md text-accent-lightest bg-primary disabled:bg-primary-light hover:bg-primary-dark"
    />
  );
};

export const SecondaryButton = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      type="button"
      buttonClassName="px-2 py-1 my-1 font-semibold border rounded-md border-info text-info bg-info-lightest disabled:bg-info-lighter hover:bg-info-lighter"
    />
  );
};

export const SecondaryButtonFull = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      type="button"
      buttonClassName="w-full px-2 py-1 my-1 font-semibold border rounded-md border-info text-info bg-info-lightest disabled:bg-info-lighter hover:bg-info-lighter"
    />
  );
};

export const SubmitButton = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      buttonClassName="px-2 py-1 my-1 font-semibold rounded-md bg-primary text-accent-lightest hover:bg-primary-dark disabled:bg-primary-light"
    />
  );
};

export const SecondarySubmitButton = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      buttonClassName="px-2 py-1 my-1 font-semibold border rounded-md border-info bg-info-lightest text-info hover:bg-info-lighter disabled:bg-info-lighter"
    />
  );
};

export const SubmitButtonFull = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      buttonClassName="w-full px-2 py-2 my-1 font-semibold rounded-md bg-primary text-accent-lightest hover:bg-primary-dark disabled:bg-primary-light"
    />
  );
};

export const DeleteButton = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      buttonClassName="px-2 py-1 my-1 font-semibold border rounded-md border-error bg-error-lightest text-error hover:bg-error-lighter disabled:bg-error-lighter"
    />
  );
};

export const ResetButton = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      type="reset"
      buttonClassName="px-2 py-1 my-1 font-semibold underline text-info disabled:text-accent"
    />
  );
};

const _Button = (props: BaseButtonProps): JSX.Element => {
  const button = (
    <button
      type={props.type ? props.type : "submit"}
      className={props.buttonClassName}
      disabled={props.disabled}
      hidden={props.hidden}
    >
      {props.text}
    </button>
  );
  if (props.href) {
    return (
      <Link href={props.href} passHref>
        {button}
      </Link>
    );
  }
  return button;
};
