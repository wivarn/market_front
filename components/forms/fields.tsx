import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
} from "react";
import { FieldHookConfig, FormikProps, useField } from "formik";
import { SmallArrowNarrowDown, SmallXIcon } from "components/icons";

import { RefObject } from "react";
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

export type ComboBoxOption = {
  value: string;
  text: string;
  parent?: string;
  disabled?: boolean;
};

type ComboBoxProps = {
  name: string;
  items: ComboBoxOption[];
  label?: string;
  formik: FormikProps<any>;
  placeholder?: string;
  disabled?: boolean;
  resetRef?: RefObject<HTMLSpanElement>;
  childresetRef?: RefObject<HTMLSpanElement>;
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

export const DropdownCombobox = ({
  name,
  items,
  label,
  formik,
  placeholder,
  disabled,
  resetRef,
  childresetRef,
}: ComboBoxProps) => {
  const [inputItems, setInputItems] = useState(items);
  const itemToString = (item: any) => (item ? item.text : "");
  const itemFilter = (inputValue: string | undefined) => {
    if (!disabled) {
      setInputItems(
        items.filter((item) =>
          itemToString(item).toLowerCase().startsWith(inputValue?.toLowerCase())
        )
      );
    }
  };
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useCombobox({
    items: inputItems,
    itemToString,
    initialInputValue: formik.values[name],
    onInputValueChange: ({ inputValue }) => itemFilter(inputValue),
    onIsOpenChange: ({ inputValue }) => itemFilter(inputValue),
    onSelectedItemChange: ({ selectedItem }) => {
      formik.setFieldValue(name, selectedItem?.value);
      if (childresetRef?.current) {
        childresetRef.current.click();
      }
    },
  });

  return (
    <div className="w-max">
      {label ? <label {...getLabelProps()}>{label}</label> : null}

      <div {...getComboboxProps()} className="block">
        <input
          {...getToggleButtonProps()}
          {...getInputProps()}
          className="inline-block px-2 py-1 border rounded-md border-accent"
          placeholder={placeholder}
          disabled={disabled}
        />
        <span
          onClick={() => {
            if (!disabled) {
              selectItem({ value: "", text: "" });
            }
          }}
          aria-label="clear selection"
          className="inline-block"
          ref={resetRef}
        >
          <SmallXIcon />
        </span>
        <span
          {...getToggleButtonProps({ disabled: disabled })}
          aria-label="toggle menu"
          className="inline-block"
        >
          <SmallArrowNarrowDown />
        </span>
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
      <TextField name={name} hidden={true} />
    </div>
  );
};
