import { NextSeo } from "next-seo";
import VerifyAccountForm from "components/forms/account/verify";
import { useRouter } from "next/router";

export default function verifyAccount() {
  const router = useRouter();
  return (
    <>
      <NextSeo title="Verify Account" />
      <VerifyAccountForm />
    </>
  );
}
