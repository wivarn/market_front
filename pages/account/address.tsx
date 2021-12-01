import AccountContainer from "components/accountContainer";
import AddressForm from "components/forms/account/address";
import { NextSeo } from "next-seo";
import { redirectUnauthenticated } from "ultils/authentication";

export default function profile(): JSX.Element {
  redirectUnauthenticated();
  return (
    <>
      <NextSeo title="Address" />
      <AccountContainer activeTab="address">
        <AddressForm />
      </AccountContainer>
    </>
  );
}
