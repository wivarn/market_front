interface Props {
  disabled: boolean;
  text: string;
}

export const SubmitButton = (props: Props) => {
  return (
    <button
      type="submit"
      className="bg-primary-dark border-primary-dark text-accent-light hover:bg-primary-light hover:border-primary-dark rounded border-2 px-2 py-1 font-semibold"
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
      className="bg-secondary-dark border-secondary-dark text-accent-light hover:bg-secondary-light hover:border-secondary-dark rounded border-2 px-2 py-1 font-semibold"
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};
