import LoginForm from "components/forms/login";
import { NextSeo } from "next-seo";

export default function login() {
  return (
    <>
      <NextSeo title="Login" />
      <LoginForm />
    </>
  );
}
