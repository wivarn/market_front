import { useEffect, useState } from "react";

import { GenericErrorMessage } from "components/message";
import { IOrder } from "types/order";
import { NextSeo } from "next-seo";
import { OrderApi } from "services/backendApi/order";
import PageContainer from "components/pageContainer";
import { PurchaseOrder } from "components/order";
import { SpinnerLg } from "components/spinner";
import { useSession } from "next-auth/client";

export default function purchaseHistory(): JSX.Element {
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

  return (
    <div className="my-8">
      <NextSeo title="Purchase History" />
      <PageContainer yPadding="py-2">
        <h3 className="p-2 text-center">Purchases</h3>
        {purchases.map((order: IOrder) => {
          return <PurchaseOrder key={order.id} order={order} />;
        })}
      </PageContainer>
    </div>
  );
}
