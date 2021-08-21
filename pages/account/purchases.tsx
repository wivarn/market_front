import { useEffect, useState } from "react";

import { BlankMessage } from "components/message";
import { GenericErrorMessage } from "components/message";
import { IOrder } from "types/order";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { OrderApi } from "services/backendApi/order";
import PageContainer from "components/pageContainer";
import { PurchaseOrder } from "components/order";
import { SpinnerLg } from "components/spinner";
import { useSession } from "next-auth/client";

export default function Purchases(): JSX.Element {
  const [session, sessionLoading] = useSession();
  const [purchases, setCarts] = useState<IOrder[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionLoading) return;
    OrderApi(session?.accessToken)
      .purchases()
      .then((purchasesResponse) => {
        setCarts(purchasesResponse.data);
      })
      .catch(() => {
        setError(true);
      });
  }, [sessionLoading]);

  if (sessionLoading || !purchases) return <SpinnerLg text="Loading..." />;
  if (error) return <GenericErrorMessage />;

  function renderPurchases() {
    if (purchases?.length == 0) {
      return (
        <BlankMessage>
          <p>
            You have not made any purchases yet.
            <br />{" "}
            <Link href="/">
              <a className="underline text-info hover:text-primary">
                Start buying now
              </a>
            </Link>
          </p>
        </BlankMessage>
      );
    }
    return (
      <>
        {purchases?.map((order: IOrder) => {
          return <PurchaseOrder key={order.id} order={order} />;
        })}
      </>
    );
  }
  return (
    <div className="my-4">
      <NextSeo title="Purchases" />
      <PageContainer>
        <h3 className="pb-2 text-center">Purchases</h3>
        {renderPurchases()}
      </PageContainer>
    </div>
  );
}
