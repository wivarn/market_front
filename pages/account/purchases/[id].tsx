import { BackButton } from "components/buttons";
import { GenericErrorMessage } from "components/message";
import { NextSeo } from "next-seo";
import OrderDetails from "components/order/details";
import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function Purchases(): JSX.Element {
  const [session, sessionLoading] = useSession();
  const router = useRouter();

  function getOrder() {
    const orderID = router.query.id;
    const { data, error } = useSWR(
      session && router.isReady
        ? [`orders/${orderID}?relation=purchases`, session.accessToken]
        : null
    );

    return {
      orderResponse: data,
      orderLoading: !error && !data,
      orderError: error,
    };
  }

  const { orderResponse, orderLoading, orderError } = getOrder();

  if (sessionLoading || orderLoading) return <SpinnerLg text="Loading..." />;
  if (orderError) return <GenericErrorMessage />;

  return (
    <div className="my-4">
      <NextSeo title="Purchase Info" />
      <PageContainer>
        <div className="relative max-w-4xl mx-auto ">
          <div className="absolute">
            <BackButton text="Back" href="/account/purchases" />
          </div>
        </div>
        <h3 className="text-center">Purchase Info</h3>
        <OrderDetails order={orderResponse.data} />
      </PageContainer>
    </div>
  );
}
