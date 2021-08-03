import AccountContainer from "components/accountContainer";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { PaymentApi } from "services/backendApi/payment";
import PaymentForm from "components/forms/account/payment";
import { SpinnerLg } from "components/spinner";
import { SubmitButton } from "components/buttons";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function profile(): JSX.Element {
  const [session, loading] = useSession();

  function getPayment() {
    const { data, error } = useSWR(
      session ? ["account/payments", session.accessToken] : null
    );

    return {
      response: data,
      isLoading: !error && !data,
      error: error,
    };
  }

  const { response, isLoading, error } = getPayment();

  if (isLoading || loading) return <SpinnerLg text="Loading..." />;
  // TODO: render an error message about existing stripe connection being disconnected
  // if (error) return <div>Error</div>;

  const stripeAccount = error ? {} : response.data;

  function renderConnectButton() {
    if (stripeAccount.charges_enabled) {
      return (
        <a
          href="https://dashboard.stripe.com/account"
          target="_blank"
          rel="noreferrer"
          className="underline text-info hover:text-primary-dark"
        >
          Go to your Stripe account
        </a>
      );
    }

    async function redirectToStripe() {
      PaymentApi(session?.accessToken)
        .linkAccount()
        .then((response) => {
          window.location.assign(response.data.url);
        });
    }

    const buttonText = stripeAccount.id
      ? "Finish Connecting with Stripe"
      : "Connect with Stripe";

    return <SubmitButton text={buttonText} onClick={redirectToStripe} />;
  }

  return (
    <>
      <NextSeo title="Payments" />
      <AccountContainer activeTab="payments">
        <PaymentForm />
        <div className="container max-w-lg p-2 px-4 mx-auto mt-8 mb-8 border rounded-md bg-accent-lightest border-accent-light">
          <h5>We integrate with Stripe for Payments</h5>
          {renderConnectButton()}
        </div>
      </AccountContainer>
    </>
  );
}
