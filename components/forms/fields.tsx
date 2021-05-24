import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldHookConfig, useField } from "formik";

type TextFieldProps = FieldHookConfig<string> &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string;
  };

export const TextField: React.FC<TextFieldProps> = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div className="my-2">
      <label htmlFor={props.name}>{label}</label>
      <input className="text-input text-black" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-red-300 italic">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const NumberField: React.FC<TextFieldProps> = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div className="my-2">
      <label htmlFor={props.name}>{label}</label>
      <input type="number" className="text-black" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-red-300 italic">{meta.error}</div>
      ) : null}
    </div>
  );
};
