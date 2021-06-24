import CreateAccountForm from "components/forms/auth/create";
import { NextSeo } from "next-seo";

export default function createAccount(): JSX.Element {
  return (
    <>
      <NextSeo title="Create Account" />
      <CreateAccountForm />
    </>
  );
}
