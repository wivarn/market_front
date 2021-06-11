import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from "react";
import { FieldHookConfig, useField } from "formik";

import { anyObject } from "types/object";

type TextFieldProps = FieldHookConfig<string> &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
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

// Style variables for the fields
const labelClass = "p-1 block text-xs font-medium text-accent-darker";
const inputClass = "w-full p-2 border rounded-md border-accent";

// General text field
export const TextField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 text-accent-darkest">
      <label htmlFor={props.name} className={labelClass}>
        {label}
      </label>
      <input className={inputClass} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

// Search field
export const SearchField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 text-accent-darkest">
      <label htmlFor={props.name} className="">
        {label}
      </label>
      <input className="px-2 py-1 border rounded-full border-accent w-72" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

// Number field
export const NumberField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 text-accent-darkest">
      <label htmlFor={props.name} className={labelClass}>
        {label}
      </label>
      <input type="number" className={inputClass} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

// Single field
export const SelectBox = ({ label, options, ...props }: SelectProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 text-accent-darkest">
      <label htmlFor={props.name} className={labelClass}>
        {label}
      </label>
      <select className={inputClass} {...field} {...props}>
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

// Error messages
export const ErrorField = (props: TextFieldProps) => {
  const [_, meta] = useField(props);

  if (meta.error) {
    return <div className="text-error">{meta.error}</div>;
  }
  return <></>;
};
