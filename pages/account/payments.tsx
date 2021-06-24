import AccountContainer from "components/accountContainer";
import { NextSeo } from "next-seo";

export default function profile(): JSX.Element {
  return (
    <>
      <NextSeo title="Payments" />
      <AccountContainer activeTab="payments">Comming soon</AccountContainer>
    </>
  );
}
