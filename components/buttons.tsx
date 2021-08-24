import { BackArrowIconSm } from "components/icons";
import Link from "next/link";
import { SpinnerXs } from "./spinner";
import { useRouter } from "next/router";
interface Props {
  text: string | JSX.Element;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  submitting?: boolean;
  hidden?: boolean;
  href?: string;
  onClick?: () => Promise<void>;
}

interface BaseButtonProps extends Props {
  buttonClassName: string;
}

export const BackButton = (props: Props): JSX.Element => {
  const router = useRouter();
  const backButton = (
    <button
      {...props}
      className="flex space-x-1 font-semibold underline text-info hover:text-primary"
      type="button"
    >
      <BackArrowIconSm /> <span>{props.text}</span>
    </button>
  );
  if (props.href) {
    return (
      <Link href={props.href}>
        <a>{backButton}</a>
      </Link>
    );
  }
  return <div onClick={() => router.back()}>{backButton}</div>;
};

export const PrimaryButton = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      buttonClassName="text-accent-lightest bg-primary disabled:bg-primary-light hover:bg-primary-dark"
    />
  );
};

export const PrimaryButtonFull = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      buttonClassName="w-full text-accent-lightest bg-primary disabled:bg-primary-light hover:bg-primary-dark"
    />
  );
};

export const SecondaryButton = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      type="button"
      buttonClassName="border border-info text-info bg-info-lightest disabled:bg-info-lighter hover:bg-info-lighter"
    />
  );
};

export const SecondaryButtonFull = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      type="button"
      buttonClassName="w-full border border-info text-info bg-info-lightest disabled:bg-info-lighter hover:bg-info-lighter"
    />
  );
};

export const SubmitButton = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      buttonClassName="bg-primary text-accent-lightest hover:bg-primary-dark disabled:bg-primary-light"
    />
  );
};

export const SecondarySubmitButton = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      buttonClassName="border border-info bg-info-lightest text-info hover:bg-info-lighter disabled:bg-info-lighter"
    />
  );
};

export const SubmitButtonFull = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      buttonClassName="w-full px-2 py-2 my-1 bg-primary text-accent-lightest hover:bg-primary-dark disabled:bg-primary-light"
    />
  );
};

export const DeleteButton = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      type="button"
      buttonClassName="border border-error bg-error-lightest text-error hover:bg-error-lighter disabled:bg-error-lighter"
    />
  );
};

export const RemoveButton = (props: Props): JSX.Element => {
  return (
    <button
      {...props}
      type="button"
      className="p-1 border rounded-full bg-accent-lightest text-accent-dark hover:bg-accent-lighter disabled:bg-accent-lighter"
    >
      {props.text}
    </button>
  );
};

export const ResetButton = (props: Props): JSX.Element => {
  return (
    <_Button
      {...props}
      type="reset"
      onClick={props.onClick}
      buttonClassName="underline text-info disabled:text-accent"
    />
  );
};

const _Button = (props: BaseButtonProps): JSX.Element => {
  const button = (
    <button
      type={props.type ? props.type : "submit"}
      className={`px-2 py-1 my-1 text-sm sm:text-base font-semibold rounded-md disabled:cursor-not-allowed ${props.buttonClassName}`}
      disabled={props.disabled || props.submitting}
      hidden={props.hidden}
      onClick={props.onClick}
    >
      {props.submitting ? (
        <span className="flex justify-center space-x-2">
          <SpinnerXs /> <span>{props.text}</span>
        </span>
      ) : (
        <>{props.text}</>
      )}
    </button>
  );
  if (props.href) {
    return (
      <Link href={props.href} passHref>
        <a>{button}</a>
      </Link>
    );
  }
  return button;
};
