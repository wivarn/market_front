import AccountContainer from "components/accountContainer";
import AddressForm from "components/forms/account/address";
import { NextSeo } from "next-seo";

export default function profile(): JSX.Element {
  return (
    <>
      <NextSeo title="Address" />
      <AccountContainer activeTab="address">
        <AddressForm />
      </AccountContainer>
    </>
  );
}
