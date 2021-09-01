import { NextSeo } from "next-seo";
import ResendVerificationForm from "components/forms/auth/verifyAccountResend";

export default function VerifyAccountResend(): JSX.Element {
  return (
    <>
      <NextSeo title="Resend Verification Email" />
      <ResendVerificationForm />
    </>
  );
}
