import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { FieldHookConfig, useField } from "formik";

import { anyObject } from "types/object";

type TextFieldProps = FieldHookConfig<string> &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string | JSX.Element;
  };

type LongTextFieldProps = FieldHookConfig<string> &
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > & {
    label?: string | JSX.Element;
  };

type SelectProps = FieldHookConfig<string> &
  DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > & {
    label?: string | JSX.Element;
    options: anyObject;
  };

export const TextField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 text-accent-darkest">
      <label htmlFor={props.name} className="block text-sm font-semibold">
        {label}
      </label>
      <input
        className="w-full px-2 py-1 border rounded-md border-accent"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const LongTextField = ({ label, ...props }: LongTextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 text-accent-darkest">
      <label htmlFor={props.name} className="block text-sm font-semibold">
        {label}
      </label>
      <textarea
        className="w-full px-2 py-1 border rounded-md border-accent"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const NumberField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 text-accent-darkest">
      <label htmlFor={props.name} className="block text-sm font-semibold">
        {label}
      </label>
      <input
        type="number"
        className="px-2 py-1 border rounded-md border-accent"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const SelectBox = ({ label, options, ...props }: SelectProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 text-accent-darkest">
      <label htmlFor={props.name} className="block text-sm font-semibold">
        {label}
      </label>
      <select
        className="px-2 py-1 border rounded-md border-accent"
        {...field}
        {...props}
      >
        {props.placeholder ? (
          <option value="" disabled={true}>
            {props.placeholder}
          </option>
        ) : null}

        {Object.entries(options).map(([value, text]) => {
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const ErrorField = (props: TextFieldProps) => {
  const [_, meta] = useField(props);

  if (meta.error) {
    return <div className="text-error">{meta.error}</div>;
  }
  return <></>;
};
