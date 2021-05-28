interface Props {
  disabled: boolean;
  text: string;
}

export const SubmitButton: React.FC<Props> = (props) => {
  return (
    <button
      type="submit"
      className="px-2 py-1 font-semibold rounded bg-primary text-accent-light hover:bg-primary-light"
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export const DeleteButton: React.FC<Props> = (props) => {
  return (
    <button
      type="submit"
      className="px-2 py-1 font-semibold border-2 rounded-md bg-secondary-dark text-accent-light hover:bg-secondary"
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};
