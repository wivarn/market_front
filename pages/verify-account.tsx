import { NextSeo } from "next-seo";
import VerifyAccountForm from "components/forms/account/verify";

export default function verifyAccount() {
  return (
    <>
      <NextSeo title="Verify Account" />
      <VerifyAccountForm />
    </>
  );
}
