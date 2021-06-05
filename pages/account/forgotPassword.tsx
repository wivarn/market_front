import ForgotPasswordForm from "components/forms/account/forgotPassword";
import { NextSeo } from "next-seo";

export default function resetPassword() {
  return (
    <>
      <NextSeo title="Reset Password" />
      <ForgotPasswordForm />
    </>
  );
}
