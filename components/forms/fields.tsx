import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from "react";
import { FieldHookConfig, useField } from "formik";

type TextFieldProps = FieldHookConfig<string> &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string | JSX.Element;
  };

type SelectOptions = {
  [key: string]: any;
};

type SelectProps = FieldHookConfig<string> &
  DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > & {
    label?: string | JSX.Element;
    options: SelectOptions;
  };

export const TextField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 text-accent-darkest">
      <label htmlFor={props.name} className="block text-sm font-semibold">
        {label}
      </label>
      <input
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
        <option value="">Select Country</option>
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
