import ForgotPasswordForm from "components/forms/auth/forgotPassword";
import { NextSeo } from "next-seo";

export default function resetPassword() {
  return (
    <>
      <NextSeo title="Reset Password" />
      <ForgotPasswordForm />
    </>
  );
}
