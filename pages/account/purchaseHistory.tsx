import AccountContainer from "components/accountContainer";
import { NextSeo } from "next-seo";

export default function profile() {
  return (
    <>
      <NextSeo title="Purchase History" />
      <AccountContainer activeTab="purchaseHistory">
        Comming soon
      </AccountContainer>
    </>
  );
}
