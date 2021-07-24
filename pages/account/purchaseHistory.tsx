import AccountContainer from "components/accountContainer";
import { GenericErrorMessage } from "components/message";
import { NextSeo } from "next-seo";
import { SpinnerLg } from "components/spinner";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function profile(): JSX.Element {
  const [session, sessionLoading] = useSession();

  function getPurchases() {
    const { data, error } = useSWR(
      session ? ["orders?view=purchases", session.accessToken] : null
    );

    return {
      purchasesResponse: data,
      purchasesLoading: !error && !data,
      purchasesError: error,
    };
  }

  const {
    purchasesResponse,
    purchasesLoading,
    purchasesError,
  } = getPurchases();

  if (purchasesLoading || sessionLoading)
    return <SpinnerLg text="Loading..." />;
  if (purchasesError) return <GenericErrorMessage />;

  return (
    <>
      <NextSeo title="Purchase History" />
      <AccountContainer activeTab="purchaseHistory">
        {JSON.stringify(purchasesResponse.data)}
      </AccountContainer>
    </>
  );
}
