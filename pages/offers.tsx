import { useContext, useEffect } from "react";

import { GenericErrorMessage } from "components/message";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import PurchaseOffers from "components/offer/purchaseOffers";
import SalesOffers from "components/offer/salesOffers";
import { SpinnerLg } from "components/spinner";
import { UserSettingsContext } from "contexts/userSettings";
import { redirectUnauthenticated } from "ultils/authentication";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function Offers(): JSX.Element {
  redirectUnauthenticated();
  const { data: session, status } = useSession();
  const sessionLoading = status === "loading";
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
  if (!userSettings.address_set) {
    return (
      <PageContainer yPadding="my-8">
        <div className="container mt-8">
          <div className="grid items-center max-w-xl p-4 mx-auto rounded-md ">
            <Image src="/assets/offer.svg" height={400} width={400} />
            <div className="mt-4 text-lg text-center">
              <span>
                Please update your address before making offers.
                <br />
                <Link href="/account/address">
                  <a className="underline text-info">Update your address now</a>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
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
