import useSWR from "swr";
import api from "services/api";

// const fetcher = (...args) => fetch(...args).then(res => res.json())
const fetcher = (path) => api.get(path).then((res) => res);

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
  return <div>{JSON.stringify(listings.data)}</div>;
}
