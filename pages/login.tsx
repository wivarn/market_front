import LoginForm from "components/forms/account/login";
import { NextSeo } from "next-seo";

export default function login() {
  return (
    <>
      <NextSeo title="Login" />
      <LoginForm />
    </>
  );
}
