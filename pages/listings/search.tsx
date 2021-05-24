import ListingPreviewGrid from "components/listing/previewGrid";
import api from "services/api";
import useSWR from "swr";

const fetcher = (path: string) => api.get(path).then((res) => res);

function getListings() {
  const { data, error } = useSWR("listings/search", fetcher);

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
      <ListingPreviewGrid listings={listings?.data} />
    </div>
  );
}
