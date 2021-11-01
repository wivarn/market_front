import { GenericErrorMessage } from "components/message";
import { IOffer } from "types/offer";
import PageContainer from "components/pageContainer";
import { PurchaseOffer } from "components/offer";
import { SpinnerLg } from "components/spinner";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function PurchaseOffers(): JSX.Element {
  const [session, sessionLoading] = useSession();

  function getOffers() {
    const { data, error } = useSWR(
      session ? [`offers/purchase_offers`, session.accessToken] : null
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
    <div>
      <h3 className="text-center">Purchase Offers</h3>
      {offers.map((offer) => {
        return <PurchaseOffer key={offer.id} {...offer} />;
      })}
    </div>
  );
}
