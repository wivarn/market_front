import { ChevronDownIconSm, XIconSm } from "components/icons";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SetStateAction,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { FieldHookConfig, useField } from "formik";
import Image, { ImageLoaderProps } from "next/image";

import { Dispatch } from "react";
import { RefObject } from "react";
import { SortableImages } from "components/sortable";
import { Switch } from "@headlessui/react";
import { useCombobox } from "downshift";
import { useDropzone } from "react-dropzone";

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

type PictureProps = TextFieldProps & {
  previewImage?: string;
  setImageData: Dispatch<SetStateAction<string | Blob>>;
};

type MultiPictureProps = {
  id?: string;
  label?: string;
  description?: string;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  inputClassName?: string;
  existingImageMetas: { url: string }[];
  imageData: File[];
  setImageData: Dispatch<SetStateAction<File[]>>;
};

export type ListingComboBoxOption = {
  value: string;
  text: string;
  disabled?: boolean;
};

type ComboBoxProps = TextFieldProps & {
  label?: string;
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
      inputClassName="px-2 w-64 sm:w-96 py-1 border rounded-full border-accent"
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

export const PictureField = ({
  label,
  description,
  className,
  labelClassName,
  descriptionClassName,
  inputClassName,
  hideError,
  previewImage,
  setImageData,
  ...props
}: PictureProps): JSX.Element => {
  const [field, meta] = useField(props);
  const [previewImageState, setPreviewImageState] = useState({
    path: previewImage || "/ProfilePlaceholder.svg",
  });

  field.onChange = (event: React.ChangeEvent<any>) => {
    setPreviewImageState({
      path: URL.createObjectURL(event.target.files[0]),
    });
    setImageData(event.target.files[0]);
  };

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
      <div className="items-center m-2 ">
        <div className="container relative w-24 h-24 my-2 border rounded-full">
          <Image
            loader={({ src }: ImageLoaderProps) => {
              return src;
            }}
            src={previewImageState.path}
            alt={field.value}
            layout="fill"
            objectFit="cover"
            className="rounded-full "
          />
        </div>
        <div>
          <input
            className={inputClassName}
            type="file"
            accept="image/jpeg, image/png, image/webp, image/heic"
            {...field}
            {...props}
          />
          {!hideError && meta.touched && meta.error ? (
            <div className="text-error">{meta.error}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const MultiPictureField = ({
  label,
  description,
  existingImageMetas,
  imageData,
  setImageData,
}: MultiPictureProps): JSX.Element => {
  const [imageMetas, setImageMetas] = useState(
    existingImageMetas.length ? existingImageMetas : []
  );

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: "image/jpeg, image/png, image/webp, image/heic",
    multiple: true,
    maxFiles: 10,
    onDrop: (acceptedFiles: File[]) => {
      const newPreviews = acceptedFiles.map((file) => {
        return { url: URL.createObjectURL(file) };
      });
      // setImageMetas(imageMetas.concat(newPreviews));
      // fix this later
      setImageMetas(newPreviews);
      setImageData(acceptedFiles);
    },
  });

  const errors = fileRejections.length ? (
    <div>
      <h4>Rejected Images</h4>
      {fileRejections.map(({ file, errors }) => (
        <div key={file.name}>
          <ul>
            {errors.map((e) => (
              <li key={e.code}>
                {file.name} {e.message}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  ) : null;

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      imageMetas.forEach((file) => URL.revokeObjectURL(file.url));
    },
    [imageMetas]
  );

  return (
    <div>
      {label ? (
        <label className="text-base font-semibold text-accent-darker">
          {label}
          {description ? (
            <span className="hidden text-sm font-normal md:block text-accent-dark">
              {description}
            </span>
          ) : null}
        </label>
      ) : null}
      <div
        className="items-center w-full grid-cols-1 py-2 mx-auto gap-x-4"
        {...getRootProps()}
      >
        <div className="relative w-full rounded-md">
          <input {...getInputProps()} />
          <div className="py-12 text-center bg-white border-2 border-dashed rounded-md border-accent text-accent-darker">
            Drag and drop photos or click to upload.
          </div>
        </div>
      </div>
      <div className="my-2">
        <label className="text-base font-semibold text-accent-darker">
          Photo Preview
        </label>
        <span className="hidden text-sm font-normal md:block text-accent-dark">
          The first photo will be shown by default in your listing preview. Drag
          to reorder photos.
        </span>
        <SortableImages
          imageMetas={imageMetas}
          setImageMetas={setImageMetas}
          imageData={imageData}
          setImageData={setImageData}
        />
        {errors}
      </div>
    </div>
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

  const renderLabel = () => {
    if (!label) return null;

    // tricks the browser to not autofill the field
    const invisibleCharacter = String.fromCharCode(8204);
    const noAutofillLabel = label.split("").join(invisibleCharacter);

    return (
      <label className={labelClassName} {...getLabelProps()}>
        {noAutofillLabel}
        {description ? (
          <span className={descriptionClassName} {...getLabelProps()}>
            {description}
          </span>
        ) : null}
      </label>
    );
  };

  return (
    <div className={`${props.hidden ? "hidden" : null} ${className}`}>
      {renderLabel()}
      <div {...getComboboxProps()} className="relative">
        <input
          {...props}
          {...getToggleButtonProps()}
          {...getInputProps()}
          className={inputClassName}
          name="noAutoFill"
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
          className="absolute inline-block right-8 bottom-3 text-accent-dark"
          ref={resetRef}
        >
          <XIconSm />
        </span>
        <span
          {...getToggleButtonProps({ disabled: props.disabled })}
          aria-label="toggle menu"
          className="absolute inline-block right-2 bottom-2 text-accent-dark"
        >
          <ChevronDownIconSm />
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
                      ? "bg-primary text-white rounded-md"
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
