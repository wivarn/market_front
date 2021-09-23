import { GenericErrorMessage } from "components/message";
import { IOrdersPaginated } from "types/order";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { PurchaseOrders } from "components/order";
import { SpinnerLg } from "components/spinner";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function Purchases(): JSX.Element {
  const [session, sessionLoading] = useSession();
  const router = useRouter();

  function getPurchases() {
    const query = Object.entries(router.query)
      .map((q) => {
        return q[0] + "=" + q[1];
      })
      .join("&");
    const { data, error } = useSWR(
      session && router.isReady
        ? [`orders?view=purchases&${query}`, session.accessToken]
        : null
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

  if (sessionLoading || purchasesLoading)
    return <SpinnerLg text="Loading..." />;
  if (purchasesError) return <GenericErrorMessage />;

  const paginatedSales: IOrdersPaginated = purchasesResponse.data;

  return (
    <div className="my-4">
      <NextSeo title="Purchases" />
      <PageContainer>
        <h3 className="pb-2 text-center">Purchases</h3>
        <PurchaseOrders {...paginatedSales} />
      </PageContainer>
    </div>
  );
}
