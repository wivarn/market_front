import ChangeLoginForm from "components/forms/auth/changeLoginForm";
import { NextSeo } from "next-seo";

export default function ChangeLogin(): JSX.Element {
  return (
    <>
      <NextSeo title="Resend Verification Email" />
      <ChangeLoginForm />
    </>
  );
}
