import AccountContainer from "components/accountContainer";
import { NextSeo } from "next-seo";
import { PaymentApi } from "services/backendApi/payment";
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
      isError: error,
    };
  }

  const { response, isLoading, isError } = getPayment();

  if (isLoading || loading) return <SpinnerLg text="Loading..." />;
  if (isError) return <div>Error</div>;

  const stripeAccount = response.data;

  function renderConnectButton() {
    if (stripeAccount.charges_enabled) {
      return <span>Stripe account: {JSON.stringify(stripeAccount)}</span>;
    }

    async function redirectToStripe() {
      PaymentApi(session?.accessToken)
        .linkAccount()
        .then((response) => {
          window.location.assign(response.data.url);
        });
    }

    return (
      <SubmitButton text="Connect with Stripe" onClick={redirectToStripe} />
    );
  }

  return (
    <>
      <NextSeo title="Payments" />
      <AccountContainer activeTab="payments">
        {renderConnectButton()}
      </AccountContainer>
    </>
  );
}
