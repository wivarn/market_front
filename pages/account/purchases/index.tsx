import { GenericErrorMessage } from "components/message";
import { IOrdersPaginated } from "types/order";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { PurchaseOrders } from "components/order";
import { SpinnerLg } from "components/spinner";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { redirectUnauthenticated } from "ultils/authentication";

export default function Purchases(): JSX.Element {
  redirectUnauthenticated();
  const { data: session, status } = useSession();
  const sessionLoading = status === "loading";
  const router = useRouter();

  function getOrders() {
    const query = Object.entries(router.query)
      .map((q) => {
        return q[0] + "=" + q[1];
      })
      .join("&");
    const { data, error } = useSWR(
      session && router.isReady
        ? [`orders?relation=purchases&${query}`, session.accessToken]
        : null
    );

    return {
      ordersResponse: data,
      ordersLoading: !error && !data,
      ordersError: error,
    };
  }

  const { ordersResponse, ordersLoading, ordersError } = getOrders();

  if (sessionLoading || ordersLoading) return <SpinnerLg text="Loading..." />;
  if (ordersError) return <GenericErrorMessage />;

  const paginatedOrders: IOrdersPaginated = ordersResponse.data;

  return (
    <div className="my-4">
      <NextSeo title="Purchases" />
      <PageContainer>
        <h3 className="text-center">Purchases</h3>
        <PurchaseOrders {...paginatedOrders} />
      </PageContainer>
    </div>
  );
}
