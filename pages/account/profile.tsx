import AccountContainer from "components/accountContainer";
import { NextSeo } from "next-seo";
import ProfileForm from "components/forms/account/profile";

export default function profile() {
  return (
    <>
      <NextSeo title="Profile" />
      <AccountContainer activeTab="profile">
        <ProfileForm />
      </AccountContainer>
    </>
  );
}
