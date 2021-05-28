interface Props {
  disabled: boolean;
  text: string;
}

export const SubmitButton: React.FC<Props> = (props) => {
  return (
    <button
      type="submit"
      className="bg-primary text-accent-light hover:bg-primary-light rounded px-2 py-1 font-semibold"
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
      className="bg-secondary-dark text-accent-light hover:bg-secondary rounded-md border-2 px-2 py-1 font-semibold"
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};
