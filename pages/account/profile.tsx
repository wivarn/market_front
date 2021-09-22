import AccountContainer from "components/accountContainer";
import EmailSettingsForm from "components/forms/account/emailSettings";
import { NextSeo } from "next-seo";
import ProfileForm from "components/forms/account/profile";

export default function profile(): JSX.Element {
  return (
    <>
      <NextSeo title="Profile" />
      <AccountContainer activeTab="profile">
        <ProfileForm />
        <EmailSettingsForm />
      </AccountContainer>
    </>
  );
}
