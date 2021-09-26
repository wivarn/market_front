import { GenericErrorMessage } from "components/message";
import { NextSeo } from "next-seo";
import { Order } from "components/order";
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
      <NextSeo title="Purchase Details" />
      <PageContainer>
        <h3 className="pb-2 text-center">Purchase Details</h3>
        <Order order={orderResponse.data} />
      </PageContainer>
    </div>
  );
}
