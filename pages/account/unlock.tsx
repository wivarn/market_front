import { NextSeo } from "next-seo";
import UnlockAccountForm from "components/forms/account/unlock";

export default function resetPassword() {
  return (
    <>
      <NextSeo title="Unlock Account" />
      <UnlockAccountForm />
    </>
  );
}
