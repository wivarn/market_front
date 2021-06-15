import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SetStateAction,
  TextareaHTMLAttributes,
  useState,
} from "react";
import { FieldHookConfig, FormikProps, useField } from "formik";
import { SmChevronDownIcon, SmXIcon } from "components/icons";

import { Dispatch } from "react";
import { RefObject } from "react";
import { Switch } from "@headlessui/react";
import { useCombobox } from "downshift";

type TextFieldProps = FieldHookConfig<string> &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string | JSX.Element;
    description?: string;
    currency?: string;
  };

type LongTextFieldProps = FieldHookConfig<string> &
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > & {
    label?: string | JSX.Element;
    description?: string;
  };

// Style variables for the fields
const labelClass = "p-1 text-base font-medium text-accent-darker";
const descriptionClass = "px-1 mr-4 block text-xs font-normal text-accent-dark";
const inputClassFull = "relative w-full p-2 border rounded-md border-accent";
const inputClass = "relative p-2 border rounded-md w-96 border-accent";
const fieldClass = "items-center my-2 mx-4 py-2 px-4 grid-cols-1 mx-auto space-y-4 lg:grid-cols-3 md:grid-cols-2 grid w-full"

export type ListingComboBoxOption = {
  value: string;
  text: string;
  parent?: string;
  disabled?: boolean;
};

type ComboBoxProps = {
  name: string;
  items: ListingComboBoxOption[];
  label?: string;
  description?: string;
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

export const ListingTextField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div className={fieldClass}>
      {label ? (
        <label htmlFor={props.name} className={labelClass}>
          {label}
          <span className={descriptionClass}>{props.description}</span>
        </label>
      ) : null}
      <div className="col-span-2">
      <input className={inputClassFull} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
      ) : null}
      </div>

    </div>
  );
};


export const ListingLongTextField = ({ label, ...props }: LongTextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div className={fieldClass}>
      {label ? (
        <label htmlFor={props.name} className={labelClass}>
          {label}
          <span className={descriptionClass}>{props.description}</span>
        </label>
      ) : null}
      <div className="col-span-2">
        <textarea className={inputClassFull} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="text-error">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export const ListingNumberField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props);
  return (
    <div className={fieldClass}>
      {label ? (
        <label htmlFor={props.name} className={labelClass}>
          {label}
          <span className={descriptionClass}>{props.description}</span>
        </label>
      ) : null}
        <input type="number" className={inputClassFull} {...field} {...props} />
        <span className="justify-items-center">{props.currency}</span>
        {meta.touched && meta.error ? (
          <div className="text-error">{meta.error}</div>
        ) : null}
    </div>
  );
};

export const ListingDropdownCombobox = ({
  name,
  items,
  label,
  description,
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
    <div className={fieldClass} hidden={hidden}>
      {label ? (
        <label className={labelClass} {...getLabelProps()}>
          {label}
          <span className={descriptionClass}>{description}</span>
        </label>
      ) : null}

      <div {...getComboboxProps()} className="relative">
        <input
          {...getToggleButtonProps()}
          {...getInputProps()}
          className={inputClassFull}
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
          className="absolute inline-block right-8 bottom-3 text-accent-darker"
          ref={resetRef}
        >
          <SmXIcon />
        </span>
        <span
          {...getToggleButtonProps({ disabled: disabled })}
          aria-label="toggle menu"
          className="absolute inline-block right-2 bottom-2 text-accent-darker"
        >
          <SmChevronDownIcon />
        </span>
        <ul
          {...getMenuProps()}
          className={`${
            isOpen
              ? "absolute w-full border z-50 bg-white rounded-md border-accent mt-1"
              : ""
          }`}
        >
          {isOpen &&
            inputItems.map((item, index) => (
              <li
                key={`${item}${index}`}
                {...getItemProps({ item, index, disabled: item.disabled })}
                className={
                  "p-2 m-1 " +
                  `${
                    index === highlightedIndex
                      ? "bg-accent-darker text-accent-lightest rounded-md"
                      : ""
                  }` +
                  `${item.disabled ? "bg-primary-dark" : ""}`
                }
              >
                {item.text}
              </li>
            ))}
        </ul>
      </div>
      <ListingTextField name={name} hidden={true} />
    </div>
  );
};

export function ListingToggle({
  enabled,
  setEnabled,
  label,
  description,
  onClick,
}: ToggleProps) {
  return (
    <span onClick={onClick}>
      <Switch.Group>
        <div className={fieldClass}>
          <div className="">
            {label ? (
              <Switch.Label className={labelClass}>
              {label}
              </Switch.Label>
            ) : null}
            {description ? (
              <Switch.Description className={descriptionClass}>
              {description}
              </Switch.Description>
            ) : null}
          </div>
          <div className="col-span-2">
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${
                enabled ? "bg-success" : "bg-success-lighter"
              } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-success`}
            >
              <span
                className={`${
                  enabled ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-accent-lightest rounded-full transition-transform`}
              />
            </Switch>
          </div>
        </div>
      </Switch.Group>
    </span>
  );
}
