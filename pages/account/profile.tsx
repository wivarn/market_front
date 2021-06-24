import AccountContainer from "components/accountContainer";
import { NextSeo } from "next-seo";
import ProfileForm from "components/forms/account/profile";

export default function profile(): JSX.Element {
  return (
    <>
      <NextSeo title="Profile" />
      <AccountContainer activeTab="profile">
        <ProfileForm />
      </AccountContainer>
    </>
  );
}
