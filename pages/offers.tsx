import { useContext, useEffect } from "react";

import { GenericErrorMessage } from "components/message";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import PurchaseOffers from "components/offer/purchaseOffers";
import SalesOffers from "components/offer/salesOffers";
import { SpinnerLg } from "components/spinner";
import { UserSettingsContext } from "contexts/userSettings";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function Offers(): JSX.Element {
  const [session, sessionLoading] = useSession();
  const { userSettings, assignUserSettings } = useContext(UserSettingsContext);

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
    if (offersResponse?.data) {
      assignUserSettings({ ...userSettings, offers: offersResponse.data });
    }
  }, [offersResponse]);

  if (sessionLoading || userSettings.default_settings || offersLoading)
    return <SpinnerLg text="Loading..." />;
  if (offersError) return <GenericErrorMessage />;

  return (
    <div className="my-4">
      <NextSeo title="Offers" />
      <PageContainer>
        <PurchaseOffers offers={userSettings.offers.purchase_offers} />
        <SalesOffers offers={userSettings.offers.sale_offers} />
      </PageContainer>
    </div>
  );
}
