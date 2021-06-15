interface Props {
  text: string;
}

export function ToolTip(props:Props) {
  return (
    <div className="absolute z-10 grid items-center mt-2 -inset-4 top-10 grid-col-auto">
      <span className="px-1 py-1 text-sm text-center rounded-full whitespace-nowrap bg-accent-darker text-accent-lightest">
        {props.text}
      </span>
    </div>
  );
};
