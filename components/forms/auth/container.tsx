import {CardContainer} from "components/cardContainer";
export default function AuthFormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <CardContainer>{children}</CardContainer>
  );
}
