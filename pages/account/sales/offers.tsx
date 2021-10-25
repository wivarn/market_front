import { GenericErrorMessage } from "components/message";
import { IOffer } from "types/offer";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { SaleOffer } from "components/offer";
import { SpinnerLg } from "components/spinner";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function PurchaseOffers(): JSX.Element {
  const [session, sessionLoading] = useSession();

  function getOffers() {
    const { data, error } = useSWR(
      session ? [`offers/sale_offers`, session.accessToken] : null
    );

    return {
      offersResponse: data,
      offersLoading: !error && !data,
      offersError: error,
    };
  }

  const { offersResponse, offersLoading, offersError } = getOffers();

  if (sessionLoading || offersLoading) return <SpinnerLg text="Loading..." />;
  if (offersError) return <GenericErrorMessage />;

  const offers: IOffer[] = offersResponse.data;

  return (
    <div className="my-4">
      <NextSeo title="Purchases" />
      <PageContainer>
        <h3 className="text-center">Active Offers</h3>
        {offers.map((offer) => {
          return <SaleOffer key={offer.id} {...offer} />;
        })}
      </PageContainer>
    </div>
  );
}
