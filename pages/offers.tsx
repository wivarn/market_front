import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import PurchaseOffers from "components/offer/purchaseOffers";
import SalesOffers from "components/offer/salesOffers";
import useSWR from "swr";
import { useSession } from "next-auth/client";
import { UserSettingsContext } from "contexts/userSettings";
import { useContext, useEffect } from "react";
import { SpinnerLg } from "components/spinner";
import { GenericErrorMessage } from "components/message";

export default function Offers(): JSX.Element {
  const [session, sessionLoading] = useSession();
  const { userSettings, assignUserSettings } = useContext(UserSettingsContext);
  const purchaseOffers = userSettings.offers.purchase_offers;
  const saleOffers = userSettings.offers.sale_offers;

  const getOffers = () => {
    const { data, error } = useSWR(
      session ? [`offers`, session.accessToken] : null
    );

    return {
      offersResponse: data,
      offersLoading: !error && !data,
      offersError: error,
    };
  };

  const { offersResponse, offersLoading, offersError } = getOffers();

  useEffect(() => {
    assignUserSettings({ ...userSettings, offers: offersResponse.data });
  }, [offersResponse]);

  if (sessionLoading || offersLoading) return <SpinnerLg text="Loading..." />;
  if (offersError) return <GenericErrorMessage />;

  return (
    <div className="my-4">
      <NextSeo title="Purchases" />
      <PageContainer>
        <PurchaseOffers offers={purchaseOffers} />
        <SalesOffers offers={saleOffers} />
      </PageContainer>
    </div>
  );
}
