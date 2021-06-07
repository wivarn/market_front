import AccountContainer from "components/accountContainer";
import AddressForm from "components/forms/account/address";
import { NextSeo } from "next-seo";

export default function profile() {
  return (
    <>
      <NextSeo title="Address" />
      <AccountContainer activeTab="address">
        <AddressForm />
      </AccountContainer>
    </>
  );
}
