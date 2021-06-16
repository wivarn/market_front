interface Props {
  text: string;
}

export function ToolTip(props: Props) {
  return (
    <div className="absolute z-10 items-center hidden mt-2 group-hover:grid -inset-4 top-10 grid-col-auto">
      <span className="px-1 py-1 text-sm text-center rounded-full whitespace-nowrap bg-accent-darker text-accent-lightest">
        {props.text}
      </span>
    </div>
  );
}
