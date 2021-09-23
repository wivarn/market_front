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

  function getSales() {
    const query = Object.entries(router.query)
      .map((q) => {
        return q[0] + "=" + q[1];
      })
      .join("&");
    const { data, error } = useSWR(
      session && router.isReady
        ? [`orders?view=sales&${query}`, session.accessToken]
        : null
    );

    return {
      salesResponse: data,
      salesLoading: !error && !data,
      salesError: error,
    };
  }

  const { salesResponse, salesLoading, salesError } = getSales();
  const paginatedSales: IOrdersPaginated = salesResponse?.data;

  useEffect(() => {
    if (!paginatedSales) return;
    const has_pending_shipment = paginatedSales?.orders.some((sale) => {
      return sale.aasm_state == "pending_shipment";
    });
    assignUserSettings({ has_pending_shipment: has_pending_shipment });
  }, [paginatedSales]);

  if (salesLoading || sessionLoading) return <SpinnerLg text="Loading..." />;
  if (salesError) return <GenericErrorMessage />;

  return (
    <div className="my-4">
      <NextSeo title="Sales" />
      <PageContainer>
        <h3 className="pb-2 text-center">Sales</h3>
        <SalesOrders {...paginatedSales} />
      </PageContainer>
    </div>
  );
}
