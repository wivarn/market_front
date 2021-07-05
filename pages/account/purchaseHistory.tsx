import AccountContainer from "components/accountContainer";
import { NextSeo } from "next-seo";

export default function profile(): JSX.Element {
  return (
    <>
      <NextSeo title="Purchase History" />
      <AccountContainer activeTab="purchaseHistory">
        Coming soon
      </AccountContainer>
    </>
  );
}
