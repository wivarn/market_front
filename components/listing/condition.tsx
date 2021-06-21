import {
  conditionList,
  gradingCompanyList,
  gradingList,
} from "constants/listings";

interface Props {
  grading_company: string | undefined | null;
  condition: string | number;
}

export function ConditionPill({
  grading_company,
  condition,
}: Props): JSX.Element {
  const conditionString = grading_company?.length
    ? `${
        gradingCompanyList.find((company) => company.value == grading_company)
          ?.text
      } ${gradingList.find((grading) => grading.value == condition)?.text}`
    : conditionList.find((con) => con.value == condition)?.text;

  return (
    <span className="px-2 text-center border rounded-full w-max text-success border-success bg-success-lightest">
      {conditionString}
    </span>
  );
}
