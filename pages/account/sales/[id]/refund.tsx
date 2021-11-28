import { BackButton } from "components/buttons";
import { GenericErrorMessage } from "components/message";
import { NextSeo } from "next-seo";
import OrderDetails from "components/order/details";
import OrderRefundForm from "components/forms/order/refund";
import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function Refund(): JSX.Element {
  const [session, sessionLoading] = useSession();
  const router = useRouter();

  function getOrder() {
    const orderID = router.query.id;
    const { data, error } = useSWR(
      session && router.isReady
        ? [`orders/${orderID}?relation=sales`, session.accessToken]
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
      <NextSeo title="Refund Order" />
      <PageContainer>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute">
            <BackButton text="Back" href="/account/sales" />
          </div>
        </div>
        <h3 className="text-center">Sale Info</h3>
        <OrderDetails order={orderResponse.data} />
        <OrderRefundForm order={orderResponse.data} />
      </PageContainer>
    </div>
  );
}
