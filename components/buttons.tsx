interface Props {
  disabled?: boolean;
  text: string;
  onClick?: () => Promise<void>;
}

export const SubmitButton = (props: Props) => {
  return (
    <button
      type="submit"
      className="px-2 py-1 my-1 font-semibold rounded bg-primary text-accent-lightest hover:bg-primary-light"
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export const DeleteButton = (props: Props) => {
  return (
    <button
      type="submit"
      className="px-2 py-1 my-1 font-semibold rounded-md bg-secondary-dark text-accent-light hover:bg-secondary"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
