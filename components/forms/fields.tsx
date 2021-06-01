import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldHookConfig, useField } from "formik";

type TextFieldProps = FieldHookConfig<string> &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string;
  };

export const TextField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 text-primary-dark">
      <label htmlFor={props.name}>{label}</label>
      <input className="px-2 py-1 border rounded-md border-accent" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="italic text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const NumberField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 text-primary-dark">
      <label htmlFor={props.name}>{label}</label>
      <input
        type="number"
        className="px-2 py-1 border rounded-md border-accent"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="italic text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const ErrorField = (props: TextFieldProps) => {
  const [_, meta] = useField(props);

  if (meta.error) {
    return <div className="italic text-error">{meta.error}</div>;
  }
  return <></>;
};
