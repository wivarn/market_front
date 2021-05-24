import { Listing } from "types/listings";
import ListingPreview from "components/listing/preview";
import api from "services/api";
import useSWR from "swr";

const fetcher = (path: string) => api.get(path).then((res) => res);

function getListings() {
  const { data, error } = useSWR("listings", fetcher);

  return {
    listings: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function Listings() {
  const { listings, isLoading, isError } = getListings();

  if (isLoading) return <div>Spinner</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {listings?.data.map((listing: Listing & { id: string }) => {
        return (
          <ListingPreview
            key={listing.id}
            photos={listing.photos}
            title={listing.title}
            price={listing.price}
            currency={listing.currency}
            domestic_shipping={listing.domestic_shipping}
            condition={listing.condition}
          />
        );
      })}
    </div>
  );
}
