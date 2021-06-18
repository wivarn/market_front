export interface Props {
  grading_company: string | undefined;
  condition: string | number;
}

export function ConditionPill(props: Props): JSX.Element {
  const graded = props.grading_company !== undefined;
  if (graded) {
    return (
      <div className="">
        {props.grading_company} {props.condition}
      </div>
    );
  } else {
    return (
      <div className="text-primary">
        {props.grading_company} {props.condition}
      </div>
    );
  }
}
