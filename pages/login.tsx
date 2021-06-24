import LoginForm from "components/forms/auth/login";
import { NextSeo } from "next-seo";

export default function login(): JSX.Element {
  return (
    <>
      <NextSeo title="Login" />
      <LoginForm />
    </>
  );
}
