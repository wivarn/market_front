export interface Props {
  grading_company: string;
  condition: string | number;
}

export function ConditionPill(props: Props): JSX.Element {
  return (
    <div className="w-32 p-2 text-center border rounded-full text-success border-success bg-success-lightest">
      {props.grading_company} {props.condition}
    </div>
  );
}