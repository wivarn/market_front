import AccountContainer from "components/accountContainer";
import { GenericErrorMessage } from "components/message";
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
      isError: error,
    };
  }

  const { response, isLoading, error } = getPayment();

  if (isLoading || loading) return <SpinnerLg text="Loading..." />;
  if (error) return <GenericErrorMessage></GenericErrorMessage>;
  // TODO: render an error message about existing stripe connection being disconnected
  // if (error) return <div>Error</div>;

  const stripeAccount = error ? {} : response.data;

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
        {renderConnectButton()}
      </AccountContainer>
    </>
  );
}
