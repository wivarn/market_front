import { NextSeo } from "next-seo";
import ResetPasswordForm from "components/forms/account/resetPassword";

export default function resetPassword() {
  return (
    <>
      <NextSeo title="Reset Password" />
      <ResetPasswordForm></ResetPasswordForm>
    </>
  );
}
