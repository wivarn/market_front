import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldHookConfig, useField } from "formik";

type TextFieldProps = FieldHookConfig<string> &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string;
  };

export const TextField = ({ label, ...props }: TextFieldProps) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div className="text-primary-dark my-2">
      <label htmlFor={props.name}>{label}</label>
      <input className="px-2 py-1 border-2 rounded-md" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-error italic">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const NumberField = ({ label, ...props }: TextFieldProps) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div className="text-primary-dark my-2">
      <label htmlFor={props.name}>{label}</label>
      <input
        type="number"
        className="px-2 py-1 border-2 rounded-md"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-error italic">{meta.error}</div>
      ) : null}
    </div>
  );
};
