import CreateAccountForm from "components/forms/createAccount";
import { NextSeo } from "next-seo";

export default function login() {
  return (
    <>
      <NextSeo title="Create Account" />
      <CreateAccountForm />
    </>
  );
}
