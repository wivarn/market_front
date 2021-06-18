import { CardContainer2xl } from "components/cardContainer";
export default function AuthFormContainer({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <CardContainer2xl>{children}</CardContainer2xl>;
}
