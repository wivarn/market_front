import { NextSeo } from "next-seo";
import UnlockAccountForm from "components/forms/auth/unlock";

export default function resetPassword(): JSX.Element {
  return (
    <>
      <NextSeo title="Unlock Account" />
      <UnlockAccountForm />
    </>
  );
}
