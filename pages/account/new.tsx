import CreateAccountForm from "components/forms/account/create";
import { NextSeo } from "next-seo";

export default function createAccount() {
  return (
    <>
      <NextSeo title="Create Account" />
      <CreateAccountForm />
    </>
  );
}
