import { GenericErrorMessage } from "components/message";
import { IOrdersPaginated } from "types/order";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { SalesOrders } from "components/order";
import { SpinnerLg } from "components/spinner";
import { UserSettingsContext } from "contexts/userSettings";
import { useContext } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function sales(): JSX.Element {
  const [session, sessionLoading] = useSession();
  const router = useRouter();
  const { assignUserSettings } = useContext(UserSettingsContext);

  function getOrders() {
    const query = Object.entries(router.query)
      .map((q) => {
        return q[0] + "=" + q[1];
      })
      .join("&");
    const { data, error } = useSWR(
      session && router.isReady
        ? [`orders?relation=sales&${query}`, session.accessToken]
        : null
    );

    return {
      ordersResponse: data,
      ordersLoading: !error && !data,
      ordersError: error,
    };
  }

  const { ordersResponse, ordersLoading, ordersError } = getOrders();
  const paginatedOrders: IOrdersPaginated = ordersResponse?.data;

  useEffect(() => {
    if (!paginatedOrders) return;
    const has_pending_shipment = paginatedOrders?.orders.some((sale) => {
      return sale.aasm_state == "pending_shipment";
    });
    assignUserSettings({ has_pending_shipment: has_pending_shipment });
  }, [paginatedOrders]);

  if (ordersLoading || sessionLoading) return <SpinnerLg text="Loading..." />;
  if (ordersError) return <GenericErrorMessage />;

  return (
    <div className="my-4">
      <NextSeo title="Sales" />
      <PageContainer>
        <h3 className="pb-2 text-center">Sales</h3>
        <SalesOrders {...paginatedOrders} />
      </PageContainer>
    </div>
  );
}
