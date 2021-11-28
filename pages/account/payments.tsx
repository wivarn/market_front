import { GenericErrorMessage, InfoMessage } from "components/message";
import { useEffect, useState } from "react";

import AccountContainer from "components/accountContainer";
import { NextSeo } from "next-seo";
import { PaymentApi } from "services/backendApi/payment";
import PaymentForm from "components/forms/account/payment";
import { SpinnerLg } from "components/spinner";
import { SubmitButton } from "components/buttons";
import { UserSettingsContext } from "contexts/userSettings";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function payments(): JSX.Element {
  const { data: session, status } = useSession();
  const sessionLoading = status === "loading";
  const router = useRouter();
  // TODO: add payment type
  const [payment, setPayment] = useState<any>(null);
  const [submittingStripe, setSubmittingStripe] = useState(false);
  const [error, setError] = useState(false);
  const { userSettings, updateUserSettings } = useContext(UserSettingsContext);

  useEffect(() => {
    if (sessionLoading) return;
    PaymentApi(session?.accessToken)
      .get()
      .then((paymentResponse) => {
        setPayment(paymentResponse.data);
      })
      .catch(() => {
        setError(true);
      });
    updateUserSettings(session?.accessToken);
  }, [sessionLoading]);

  useEffect(() => {
    if (!userSettings.default_settings && !userSettings.address_set) {
      toast.error("You must set your address before setting payment options");
      router.push("/account/address");
    }
  }, [userSettings.default_settings]);

  if (sessionLoading || payment == null) return <SpinnerLg text="Loading..." />;
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
      setSubmittingStripe(true);
      PaymentApi(session?.accessToken)
        .linkAccount()
        .then((response) => {
          window.location.assign(response.data.url);
        })
        .catch((error) => {
          toast.error(error.response.data.error);
        })
        .finally(() => {
          setSubmittingStripe(false);
        });
    }

    const buttonText = payment.stripe_id
      ? "Finish Connecting with Stripe"
      : "Connect with Stripe";

    return (
      <SubmitButton
        text={buttonText}
        submitting={submittingStripe}
        onClick={redirectToStripe}
      />
    );
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
              <a
                href="https://support.skwirl.io/kb/en/article/getting-started-as-a-seller"
                rel="noreferrer"
                target="_blank"
                className="underline text-info"
              >
                Learn more.
              </a>
            </span>
          </InfoMessage>
          <div className="py-2">{renderConnectButton()}</div>
        </div>
        <PaymentForm />
      </AccountContainer>
    </>
  );
}
