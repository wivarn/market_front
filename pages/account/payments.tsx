import { GenericErrorMessage, InfoMessage } from "components/message";
import { useEffect, useState } from "react";

import AccountContainer from "components/accountContainer";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { PaymentApi } from "services/backendApi/payment";
import PaymentForm from "components/forms/account/payment";
import { SpinnerLg } from "components/spinner";
import { SubmitButton } from "components/buttons";
import { UserSettingsContext } from "contexts/userSettings";
import { useContext } from "react";
import { useSession } from "next-auth/client";

export default function payments(): JSX.Element {
  const [session, sessionLoading] = useSession();
  // TODO: add payment type
  const [stripeAccount, setStripeAccount] = useState<any>(null);
  const [error, setError] = useState(false);
  const { userSettings, updateUserSettings } = useContext(UserSettingsContext);

  useEffect(() => {
    if (sessionLoading) return;
    PaymentApi(session?.accessToken)
      .get()
      .then((paymentResponse) => {
        setStripeAccount(paymentResponse.data);
      })
      .catch(() => {
        setError(true);
      });
    updateUserSettings(session?.accessToken);
  }, [sessionLoading]);

  if (sessionLoading || !stripeAccount) return <SpinnerLg text="Loading..." />;
  if (error) return <GenericErrorMessage />;

  function renderConnectButton() {
    if (userSettings.stripe_linked) {
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
        <div className="container max-w-lg p-2 px-4 mx-auto mt-8 mb-8 border rounded-md bg-accent-lightest border-accent-light">
          <h5 className="my-2 text-center text-accent-darker">
            Stripe Payments
          </h5>
          <InfoMessage>
            <span>
              We use Stripe to securely manage payments. You must set up a
              Stripe account to sell on Skwirl.{" "}
              <Link href="#">
                <a className="underline text-info">Learn more.</a>
              </Link>
            </span>
          </InfoMessage>
          <div className="py-2">{renderConnectButton()}</div>
        </div>
        <PaymentForm />
      </AccountContainer>
    </>
  );
}
