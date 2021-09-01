import { BlankMessage, GenericErrorMessage } from "components/message";

import { IOrder } from "types/order";
import Link from "next/link";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { SalesOrder } from "components/order";
import { SpinnerLg } from "components/spinner";
import { UserSettingsContext } from "contexts/userSettings";
import { useContext } from "react";
import { useEffect } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function sales(): JSX.Element {
  const [session, sessionLoading] = useSession();
  const { assignUserSettings } = useContext(UserSettingsContext);

  function getSales() {
    const { data, error } = useSWR(
      session ? ["orders?view=sales", session.accessToken] : null
    );

    return {
      salesResponse: data,
      salesLoading: !error && !data,
      salesError: error,
    };
  }

  const { salesResponse, salesLoading, salesError } = getSales();
  const sales: IOrder[] = salesResponse?.data;

  useEffect(() => {
    if (!sales) return;
    const has_pending_shipment = sales?.some((sale) => {
      return sale.aasm_state == "pending_shipment";
    });
    assignUserSettings({ has_pending_shipment: has_pending_shipment });
  }, [sales]);

  if (salesLoading || sessionLoading) return <SpinnerLg text="Loading..." />;
  if (salesError) return <GenericErrorMessage />;

  function renderSales() {
    if (sales.length == 0) {
      return (
        <BlankMessage>
          <p>
            You have not made any sales yet.
            <br />{" "}
            <Link href="/listings?state=active">
              <a className="underline text-info hover:text-primary">
                Start selling now
              </a>
            </Link>
          </p>
        </BlankMessage>
      );
    }
    return (
      <div>
        {sales.map((order: IOrder) => {
          return <SalesOrder key={order.id} order={order} />;
        })}
      </div>
    );
  }

  return (
    <div className="my-4">
      <NextSeo title="Sales" />
      <PageContainer>
        <h3 className="pb-2 text-center">Sales</h3>
        {renderSales()}
      </PageContainer>
    </div>
  );
}
