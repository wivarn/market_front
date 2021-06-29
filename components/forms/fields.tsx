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
    className?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    inputClassName?: string;
    hideError?: boolean;
  };

type TextAreaProps = FieldHookConfig<string> &
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > & {
    label?: string;
    description?: string;
    className?: string;
    labelClassName?: string;
    descriptionClassName?: string;
    inputClassName?: string;
  };

export type ListingComboBoxOption = {
  value: string;
  text: string;
  disabled?: boolean;
};

type ComboBoxProps = TextFieldProps & {
  items: ListingComboBoxOption[];
  resetRef?: RefObject<HTMLSpanElement>;
  childresetRef?: RefObject<HTMLSpanElement>;
};

// Style variables for the fields
const labelClassName = "p-1 block text-sm font-semibold text-accent-darker";
const descriptionClassName = "p-1 block text-sm font-normal text-accent-dark";
const fullInputClassName = "w-full p-2 border rounded-md border-accent";
const inputClassName = "p-2 border rounded-md w-72 border-accent";

type ToggleProps = TextFieldProps & {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  onClick?: () => Promise<void>;
};

export const TextField = ({ label, ...props }: TextFieldProps): JSX.Element => {
  return (
    <_InputField
      label={label}
      labelClassName={labelClassName}
      inputClassName={inputClassName}
      {...props}
    />
  );
};

export const TextFieldFull = ({
  label,
  ...props
}: TextFieldProps): JSX.Element => {
  return (
    <_InputField
      label={label}
      labelClassName={labelClassName}
      inputClassName={fullInputClassName}
      {...props}
    />
  );
};

export const TextArea = ({ label, ...props }: TextAreaProps): JSX.Element => {
  return (
    <_TextArea
      label={label}
      labelClassName={labelClassName}
      inputClassName={inputClassName}
      {...props}
    />
  );
};

export const SearchField = ({
  label,
  ...props
}: TextFieldProps): JSX.Element => {
  return (
    <_InputField
      label={label}
      labelClassName={labelClassName}
      inputClassName="px-2 py-1 border rounded-full w-72 border-accent"
      {...props}
    />
  );
};

export const NumberField = ({
  label,
  ...props
}: TextFieldProps): JSX.Element => {
  return <TextField label={label} type="number" {...props} />;
};

export const DropdownCombobox = ({
  items,
  label,
  description,
  resetRef,
  childresetRef,
  ...props
}: ComboBoxProps): JSX.Element => {
  return (
    <_DropdownCombobox
      items={items}
      label={label}
      description={description}
      labelClassName={labelClassName}
      descriptionClassName={descriptionClassName}
      inputClassName={fullInputClassName}
      resetRef={resetRef}
      childresetRef={childresetRef}
      {...props}
    />
  );
};

export function Toggle({
  enabled,
  setEnabled,
  label,
  description,
  onClick,
  ...props
}: ToggleProps): JSX.Element {
  return (
    <_Toggle
      enabled={enabled}
      setEnabled={setEnabled}
      label={label}
      description={description}
      onClick={onClick}
      labelClassName={labelClassName}
      descriptionClassName={descriptionClassName}
      {...props}
    />
  );
}

export const FileField = ({ label, ...props }: TextFieldProps): JSX.Element => {
  return (
    <_InputField
      label={label}
      labelClassName={labelClassName}
      inputClassName={inputClassName}
      type="file"
      {...props}
    />
  );
};

export const _InputField = ({
  label,
  description,
  className,
  labelClassName,
  descriptionClassName,
  inputClassName,
  hideError,
  ...props
}: TextFieldProps): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={props.id} className={labelClassName}>
          {label}
          {description ? (
            <span className={descriptionClassName}>{description}</span>
          ) : null}
        </label>
      ) : null}
      <div className="col-span-2">
        <input className={inputClassName} {...field} {...props} />
        {!hideError && meta.touched && meta.error ? (
          <div className="text-error">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export const _TextArea = ({
  label,
  description,
  className,
  labelClassName,
  descriptionClassName,
  inputClassName,
  ...props
}: TextAreaProps): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={props.id} className={labelClassName}>
          {label}
          {description ? (
            <span className={descriptionClassName}>{description}</span>
          ) : null}
        </label>
      ) : null}
      <div className="col-span-2">
        <textarea className={inputClassName} {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="text-error">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export const _DropdownCombobox = ({
  items,
  label,
  description,
  className,
  labelClassName,
  descriptionClassName,
  inputClassName,
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
    closeMenu,
    highlightedIndex,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    selectItem,
  } = useCombobox({
    items: inputItems,
    itemToString,
    onInputValueChange: ({ inputValue }) => itemFilter(inputValue),
    initialSelectedItem: items.find((item) => item.value == field.value),
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
        (type == useCombobox.stateChangeTypes.ItemClick ||
          useCombobox.stateChangeTypes.InputKeyDownEnter)
      ) {
        fieldHelpers.setValue(`${selectedItem.value}`);
      }
      if (
        type == useCombobox.stateChangeTypes.InputBlur ||
        type == useCombobox.stateChangeTypes.FunctionCloseMenu
      ) {
        selectItem(items[highlightedIndex]);
        fieldHelpers.setTouched(true);
      }
    },
  });

  return (
    <div className={`${props.hidden ? "hidden" : null} ${className}`}>
      {label ? (
        <label className={labelClassName} {...getLabelProps()}>
          {label}
          {description ? (
            <span className={descriptionClassName} {...getLabelProps()}>
              {description}
            </span>
          ) : null}
        </label>
      ) : null}

      <div {...getComboboxProps()} className="relative">
        <input
          {...props}
          {...getToggleButtonProps()}
          {...getInputProps()}
          className={inputClassName}
          tabIndex="0"
          onBlur={() => {
            closeMenu();
            !isOpen && fieldHelpers.setTouched(true);
          }}
        />
        <input {...field} {...props} hidden />
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

export function _Toggle({
  enabled,
  setEnabled,
  label,
  description,
  onClick,
  className,
  labelClassName,
  descriptionClassName,
  ...props
}: ToggleProps): JSX.Element {
  const [field] = useField(props);

  return (
    <span onClick={onClick}>
      <input {...field} {...props} type="checkbox" hidden />
      <Switch.Group>
        <div className={className}>
          <div>
            {label ? (
              <Switch.Label className={labelClassName}>{label}</Switch.Label>
            ) : null}
            {description ? (
              <Switch.Description className={descriptionClassName}>
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
              } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-success focus:ring-2 focus:ring-offset-2`}
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
