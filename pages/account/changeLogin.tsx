import ChangeLoginForm from "components/forms/auth/changeLoginForm";
import { NextSeo } from "next-seo";
import { redirectUnauthenticated } from "ultils/authentication";

export default function ChangeLogin(): JSX.Element {
  redirectUnauthenticated();
  return (
    <>
      <NextSeo title="Change Email" />
      <ChangeLoginForm />
    </>
  );
}
