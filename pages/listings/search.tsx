import ListingPreviewGrid from "components/listing/previewGrid";
import { NextSeo } from "next-seo";
import useSWR from "swr";

function getListings() {
  const { data, error } = useSWR("listings/search");

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
    <div>
      <NextSeo title="Search Results" />
      <h2 className="m-6 text-primary-dark">Your search results</h2>
      <ListingPreviewGrid listings={listings.data} />
    </div>
  );
}
