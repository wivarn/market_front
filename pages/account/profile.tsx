import AccountContainer from "components/accountContainer";
import EmailSettingsForm from "components/forms/account/emailSettings";
import { NextSeo } from "next-seo";
import ProfileForm from "components/forms/account/profile";
import { redirectUnauthenticated } from "ultils/authentication";

export default function profile(): JSX.Element {
  redirectUnauthenticated();
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
