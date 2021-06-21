import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SetStateAction,
  TextareaHTMLAttributes,
} from "react";
import { FieldHookConfig, useField } from "formik";
import { _DropdownCombobox, _InputField, _TextArea, _Toggle } from "../fields";

import { Dispatch } from "react";
import { RefObject } from "react";

type TextFieldProps = FieldHookConfig<string> &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string;
    description?: string;
  };

type LongTextFieldProps = FieldHookConfig<string> &
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > & {
    label?: string;
    description?: string;
  };

type PriceFieldProps = TextFieldProps & {
  currency?: string;
};

// Style variables for the fields
const labelClassName = "text-base font-medium text-accent-darker";
const descriptionClassName =
  "md:block hidden text-sm font-normal text-accent-dark";
const fullInputClassName =
  "relative w-full p-2 border rounded-md border-accent";
const className =
  "grid items-center w-full grid-cols-1 py-2 mx-auto gap-x-4 lg:grid-cols-3 md:grid-cols-2";

export type ListingComboBoxOption = {
  value: string;
  text: string;
  disabled?: boolean;
};

type ComboBoxProps = TextFieldProps & {
  items: ListingComboBoxOption[];
  description?: string;
  resetRef?: RefObject<HTMLSpanElement>;
  childresetRef?: RefObject<HTMLSpanElement>;
};

type ToggleProps = TextFieldProps & {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  onClick?: () => Promise<void>;
};

export const ListingTextField = ({
  label,
  description,
  ...props
}: TextFieldProps): JSX.Element => {
  return (
    <_InputField
      label={label}
      description={description}
      className={className}
      labelClassName={labelClassName}
      descriptionClassName={descriptionClassName}
      inputClassName={fullInputClassName}
      {...props}
    />
  );
};

export const ListingLongTextField = ({
  label,
  description,
  ...props
}: LongTextFieldProps): JSX.Element => {
  return (
    <_TextArea
      label={label}
      description={description}
      className={className}
      labelClassName={labelClassName}
      descriptionClassName={descriptionClassName}
      inputClassName={fullInputClassName}
      {...props}
    />
  );
};

export const ListingNumberField = ({
  label,
  ...props
}: PriceFieldProps): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={props.id} className={labelClassName}>
          {label}
          <span className={descriptionClassName}>{props.description}</span>
        </label>
      ) : null}
      <div className="relative">
        <input
          type="number"
          className={fullInputClassName}
          {...field}
          {...props}
        />
        <span className="absolute top-0 right-0 p-2 border border-accent-darker text-accent-lightest rounded-r-md bg-accent-darker">
          {props.currency}
        </span>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const ListingDropdownCombobox = ({
  items,
  label,
  description,
  resetRef,
  childresetRef,
  ...props
}: ComboBoxProps): JSX.Element => {
  return (
    <_DropdownCombobox
      items={items}
      label={label}
      description={description}
      className={className}
      labelClassName={labelClassName}
      descriptionClassName={descriptionClassName}
      inputClassName={fullInputClassName}
      resetRef={resetRef}
      childresetRef={childresetRef}
      {...props}
    />
  );
};

export function ListingToggle({
  enabled,
  setEnabled,
  label,
  description,
  onClick,
  ...props
}: ToggleProps): JSX.Element {
  return (
    <_Toggle
      enabled={enabled}
      setEnabled={setEnabled}
      label={label}
      description={description}
      onClick={onClick}
      className={className}
      labelClassName={labelClassName}
      descriptionClassName={descriptionClassName}
      {...props}
    />
  );
}
