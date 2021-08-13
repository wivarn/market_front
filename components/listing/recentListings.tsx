import { GenericErrorMessage } from "components/message";
import Link from "next/link";
import ListingPreviewGrid from "./previewGrid";
import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { UserSettingsContext } from "contexts/userSettings";
import { useContext } from "react";
import useSWR from "swr";

export const RecentListings = (): JSX.Element => {
  const { userSettings } = useContext(UserSettingsContext);

  function getRecentCards() {
    const { data, error } = useSWR(
      `listings/recent_by_category?destination_country=${userSettings.country}`
    );

    return {
      cardsResponse: data,
      cardsLoading: !error && !data,
      cardsError: error,
    };
  }

  const { cardsResponse, cardsLoading, cardsError } = getRecentCards();
  if (cardsLoading) return <SpinnerLg text="Loading..." />;
  if (cardsError)
    return (
      <PageContainer>
        <GenericErrorMessage></GenericErrorMessage>
      </PageContainer>
    );

  const cards = cardsResponse.data;

  return (
    <div className="py-2">
      <PageContainer yPadding="py-2 mt-2 mb-4">
        <h3 className="my-4 text-center text-accent-darker">
          Sports Cards{" "}
          <Link href="/listings/search?category=SPORTS_CARDS">
            <a className="text-base underline text-info">View All</a>
          </Link>
        </h3>
        <div>
          <ListingPreviewGrid listings={cards.sports_cards} />
        </div>
      </PageContainer>
      <PageContainer yPadding="py-2 mb-4">
        <h3 className="my-4 text-center">
          Trading Cards{" "}
          <Link href="/listings/search?category=TRADING_CARDS">
            <a className="text-base underline text-info">View All</a>
          </Link>
        </h3>
        <div>
          <ListingPreviewGrid listings={cards.trading_cards} />
        </div>
      </PageContainer>
      <PageContainer yPadding="py-2 mb-4">
        <h3 className="my-4 text-center">
          Collectibles{" "}
          <Link href="/listings/search?category=COLLECTIBLES">
            <a className="text-base underline text-info">View All</a>
          </Link>
        </h3>
        <div>
          <ListingPreviewGrid listings={cards.collectibles} />
        </div>
      </PageContainer>
    </div>
  );
};
