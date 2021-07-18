import ListingPreviewGrid from "./previewGrid";
import { SpinnerLg } from "components/spinner";
import useSWR from "swr";

export const RecentListings = (): JSX.Element => {
  function getRecentCards() {
    const { data, error } = useSWR("listings/recent_by_category");

    return {
      cardsResponse: data,
      cardsLoading: !error && !data,
      cardsError: error,
    };
  }

  const { cardsResponse, cardsLoading, cardsError } = getRecentCards();
  if (cardsLoading) return <SpinnerLg text="Loading..." />;
  if (cardsError) return <div>Error</div>;

  const cards = cardsResponse.data;

  return (
    <div>
      <h2>New Sports Card Listings</h2>
      <div>
        <ListingPreviewGrid listings={cards.sports_cards} />
      </div>
      <h2>New Trading Card Listings</h2>
      <div>
        <ListingPreviewGrid listings={cards.trading_cards} />
      </div>
      <h2>New Collectible Listings</h2>
      <div>
        <ListingPreviewGrid listings={cards.collectibles} />
      </div>
    </div>
  );
};
