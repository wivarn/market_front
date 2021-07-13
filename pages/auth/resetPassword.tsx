import { NextSeo } from "next-seo";
import ResetPasswordForm from "components/forms/auth/resetPassword";

export default function resetPassword(): JSX.Element {
  return (
    <>
      <NextSeo title="Reset Password" />
      <ResetPasswordForm />
    </>
  );
}
