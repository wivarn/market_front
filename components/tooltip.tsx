interface Props {
  text: string;
}

export function ToolTip(props:Props) {
  return (
    <div className="absolute z-10 flex flex-col items-center mt-1 -right-1">
      <span className="px-2 text-sm text-center whitespace-no-wrap rounded-full bg-accent-darker text-accent-lightest">
        {props.text}
      </span>
    </div>
  );
};
