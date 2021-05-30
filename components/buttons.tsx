interface Props {
  disabled: boolean;
  text: string;
}

export const SubmitButton: React.FC<Props> = (props) => {
  return (
    <button
      type="submit"
      className="px-2 py-1 font-semibold text-white rounded bg-primary hover:bg-primary-dark"
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
      className="px-2 py-1 font-semibold text-white border-2 rounded-md bg-secondary-dark hover:bg-secondary"
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};
