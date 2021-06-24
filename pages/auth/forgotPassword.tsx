import ForgotPasswordForm from "components/forms/auth/forgotPassword";
import { NextSeo } from "next-seo";

export default function resetPassword(): JSX.Element {
  return (
    <>
      <NextSeo title="Reset Password" />
      <ForgotPasswordForm />
    </>
  );
}
