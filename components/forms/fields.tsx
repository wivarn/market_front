import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
} from "react";
import { FieldHookConfig, FormikProps, useField } from "formik";

import { anyObject } from "types/object";
import { useCombobox } from "downshift";

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

type ComboBoxOption = {
  value: string;
  text: string;
  parent?: string;
  disabled?: boolean;
};

type ComboBoxProps = {
  name: string;
  items: ComboBoxOption[];
  label?: string;
  formik?: FormikProps<any>;
  placeholder?: string;
};

export const TextField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 text-accent-darkest">
      {label ? (
        <label htmlFor={props.name} className="block text-sm font-semibold">
          {label}
        </label>
      ) : null}
      <input
        className="px-2 py-1 border rounded-md w-72 border-accent"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const TextFieldFull = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 text-accent-darkest">
      {label ? (
        <label htmlFor={props.name} className="block text-sm font-semibold">
          {label}
        </label>
      ) : null}
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
      {label ? (
        <label htmlFor={props.name} className="block text-sm font-semibold">
          {label}
        </label>
      ) : null}
      <textarea
        className="px-2 py-1 border rounded-md w-72 border-accent"
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
      {label ? (
        <label htmlFor={props.name} className="block text-sm font-semibold">
          {label}
        </label>
      ) : null}
      <input
        type="number"
        className="px-2 py-1 border rounded-md w-72 border-accent"
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
      {label ? (
        <label htmlFor={props.name} className="block text-sm font-semibold">
          {label}
        </label>
      ) : null}
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

export const DropdownCombobox = ({
  name,
  items,
  label,
  formik,
  placeholder,
}: ComboBoxProps) => {
  if (!formik) return <div>Spinner</div>;

  const [inputItems, setInputItems] = useState(items);
  const itemToString = (item: any) => (item ? item.text : "");
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    itemToString,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          itemToString(item).toLowerCase().startsWith(inputValue?.toLowerCase())
        )
      );
    },
    onSelectedItemChange: ({ selectedItem }) => {
      formik.values[name] = selectedItem?.value;
    },
  });
  return (
    <div className="w-max">
      {label ? <label {...getLabelProps()}>{label}</label> : null}

      <div {...getComboboxProps()}>
        <input
          {...getToggleButtonProps()}
          {...getInputProps()}
          className="px-2 py-1 border rounded-md border-accent"
          placeholder={placeholder}
        />
      </div>
      <ul
        {...getMenuProps()}
        className={`${isOpen ? "border rounded-md border-accent " : ""}`}
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              key={`${item}${index}`}
              {...getItemProps({ item, index, disabled: item.disabled })}
              className={
                "p-1 m-1 " +
                `${index === highlightedIndex ? "bg-primary" : ""}` +
                `${item.disabled ? "bg-primary-dark" : ""}`
              }
            >
              {item.text}
            </li>
          ))}
      </ul>
    </div>
  );
};
