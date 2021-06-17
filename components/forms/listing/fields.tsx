import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SetStateAction,
  TextareaHTMLAttributes,
  useState,
} from "react";
import { FieldHookConfig, useField } from "formik";
import { SmChevronDownIcon, SmXIcon } from "components/icons";

import { Dispatch } from "react";
import { RefObject } from "react";
import { Switch } from "@headlessui/react";
import { useCombobox } from "downshift";

type TextFieldProps = FieldHookConfig<string> &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string | JSX.Element;
    description?: string;
  };

type LongTextFieldProps = FieldHookConfig<string> &
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > & {
    label?: string | JSX.Element;
    description?: string;
  };

type PriceFieldProps = TextFieldProps & {
  currency?: string;
};

// Style variables for the fields
const labelClass = "text-base font-medium text-accent-darker";
const descriptionClass = "md:block hidden text-sm font-normal text-accent-dark";
const inputClassFull = "relative w-full p-2 border rounded-md border-accent";
const fieldClass =
  "py-2 gap-x-4 items-center grid-cols-1 mx-auto lg:grid-cols-3 md:grid-cols-2 grid w-full";

export type ListingComboBoxOption = {
  value: string;
  text: string;
  disabled?: boolean;
};

type ComboBoxProps = TextFieldProps & {
  items: ListingComboBoxOption[];
  description?: string;
  resetRef?: RefObject<HTMLSpanElement>;
  childresetRef?: RefObject<HTMLSpanElement>;
};

type ToggleProps = TextFieldProps & {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  onClick?: () => Promise<void>;
};

export const ListingTextField = ({
  label,
  ...props
}: TextFieldProps): JSX.Element => {
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

export const ListingLongTextField = ({
  label,
  ...props
}: LongTextFieldProps): JSX.Element => {
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

export const ListingNumberField = ({
  label,
  ...props
}: PriceFieldProps): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <div className={fieldClass}>
      {label ? (
        <label htmlFor={props.name} className={labelClass}>
          {label}
          <span className={descriptionClass}>{props.description}</span>
        </label>
      ) : null}
      <div className="relative">
        <input type="number" className={inputClassFull} {...field} {...props} />
        <span className="absolute top-0 right-0 p-2 border border-accent-darker text-accent-lightest rounded-r-md bg-accent-darker">
          {props.currency}
        </span>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const ListingDropdownCombobox = ({
  items,
  label,
  description,
  resetRef,
  childresetRef,
  ...props
}: ComboBoxProps): JSX.Element => {
  const [field, meta, fieldHelpers] = useField(props);
  const [inputItems, setInputItems] = useState(items);
  const itemToString = (item: any) => (item ? item.text : "");
  const itemFilter = (inputValue: string | undefined) => {
    if (!props.disabled) {
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
    onInputValueChange: ({ inputValue }) => itemFilter(inputValue),
    onIsOpenChange: () => {
      setInputItems(items);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        fieldHelpers.setValue(`${selectedItem?.value}`);
      }
      if (childresetRef?.current) {
        childresetRef.current.click();
      }
    },
    onStateChange: ({ type, selectedItem }) => {
      if (
        selectedItem &&
        (type == "__item_click__" || type == "__input_keydown_enter__")
      ) {
        fieldHelpers.setValue(`${selectedItem?.value}`);
      }
    },
  });

  return (
    <div className={`${props.hidden ? "hidden" : null} ${fieldClass}`}>
      {label ? (
        <label className={labelClass} {...getLabelProps()}>
          {label}
          <span className={descriptionClass}>{description}</span>
        </label>
      ) : null}

      <div {...getComboboxProps()} className="relative">
        <input
          {...props}
          {...getToggleButtonProps()}
          {...getInputProps()}
          className={inputClassFull}
          tabIndex="0"
          onBlur={() => {
            // TODO: Find a way to do this without setTimeout
            setTimeout(() => {
              fieldHelpers.setTouched(true);
            }, 100);
          }}
        />
        <input {...field} {...props} className={inputClassFull} hidden />
        <span
          onClick={() => {
            if (!props.disabled) {
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
          {...getToggleButtonProps({ disabled: props.disabled })}
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
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export function ListingToggle({
  enabled,
  setEnabled,
  label,
  description,
  onClick,
  ...props
}: ToggleProps): JSX.Element {
  const [field] = useField(props);

  return (
    <span onClick={onClick}>
      <input {...field} {...props} type="checkbox" hidden />
      <Switch.Group>
        <div className={fieldClass}>
          <div>
            {label ? (
              <Switch.Label className={labelClass}>{label}</Switch.Label>
            ) : null}
            {description ? (
              <Switch.Description className={descriptionClass}>
                {description}
              </Switch.Description>
            ) : null}
          </div>
          <div>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              type="button"
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
