import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SetStateAction,
  TextareaHTMLAttributes,
  useState,
} from "react";
import { FieldHookConfig, FormikProps, useField } from "formik";
import { SmallArrowNarrowDown, SmallXIcon } from "components/icons";

import { Dispatch } from "react";
import { RefObject } from "react";
import { Switch } from "@headlessui/react";
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

// Style variables for the fields
const labelClass = "p-1 block text-sm font-medium text-accent-darker";
const inputClassFull = "w-full p-2 border rounded-md border-accent";
const inputClass = "p-2 border rounded-md w-72 border-accent";

// General text field
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
  hidden?: boolean;
};

type ToggleProps = {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  label?: string;
  description?: string;
  onClick?: () => Promise<void>;
};

export const TextField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 text-accent-darkest">
      {label ? (
        <label htmlFor={props.name} className={labelClass}>
          {label}
        </label>
      ) : null}
      <input
        className={inputClass}
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
        <label htmlFor={props.name} className={labelClass}>
          {label}
        </label>
      ) : null}
      <input
        className={inputClassFull}
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
        <label htmlFor={props.name} className={labelClass}>
          {label}
        </label>
      ) : null}
      <textarea
        className={inputClass}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const SearchField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="my-2 text-accent-darkest">
      {label ? (
        <label htmlFor={props.name} className={labelClass}>
          {label}
        </label>
      ) : null}
      <input
        className={"px-2 py-1 border rounded-full w-72 border-accent"}
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
        <label htmlFor={props.name} className={labelClass}>
          {label}
        </label>
      ) : null}
      <input
        type="number"
        className={inputClass}
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
  hidden,
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
    onIsOpenChange: () => {
      setInputItems(items);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      formik.setFieldValue(name, selectedItem?.value);
      if (childresetRef?.current) {
        childresetRef.current.click();
      }
    },
  });

  return (
    <div className="w-max" hidden={hidden}>
      {label ? (
        <label className={labelClass} {...getLabelProps()}>
          {label}
        </label>
      ) : null}

      <div {...getComboboxProps()} className="block">
        <input
          {...getToggleButtonProps()}
          {...getInputProps()}
          className={inputClass}
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
        className={`${isOpen ? "border rounded-md border-accent mt-1" : ""}`}
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              key={`${item}${index}`}
              {...getItemProps({ item, index, disabled: item.disabled })}
              className={
                "p-2 m-1 " +
                `${index === highlightedIndex ? "bg-accent-darker text-accent-lightest rounded-md" : ""}` +
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

export function Toggle({
  enabled,
  setEnabled,
  label,
  description,
  onClick,
}: ToggleProps) {
  return (
    <span onClick={onClick}>
      <Switch.Group>
        <div className="flex items-center">
          <div className="mr-4">
            {label ? (
              <Switch.Label className="block">
                <h3>{label}</h3>
              </Switch.Label>
            ) : null}
            {description ? (
              <Switch.Description className="block">
                {description}
              </Switch.Description>
            ) : null}
          </div>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-primary" : "bg-primary-lighter"
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
          >
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-secondary rounded-full transition-transform`}
            />
          </Switch>
        </div>
      </Switch.Group>
    </span>
  );
}
