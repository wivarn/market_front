import { BlankMessage, GenericErrorMessage } from "components/message";

import { IOrder } from "types/order";
import Link from "next/link";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { SalesOrder } from "components/order";
import { SpinnerLg } from "components/spinner";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function sales(): JSX.Element {
  const [session, sessionLoading] = useSession();

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

  if (salesLoading || sessionLoading) return <SpinnerLg text="Loading..." />;
  if (salesError) return <GenericErrorMessage />;

  const sales = salesResponse.data;

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
