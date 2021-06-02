import ListingPreviewGrid from "components/listing/previewGrid";
import { NextSeo } from "next-seo";
import { PrimaryButton } from "components/buttonLink";
import api from "services/api";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function Listings() {
  const [session, loading] = useSession();

  const fetcher = (path: string) =>
    api
      .get(path, {
        headers: { Authorization: `Bearer ${session?.accessToken}` },
      })
      .then((res) => res);

  function getListings() {
    const { data, error } = useSWR("/listings", fetcher);

    return {
      listings: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const { listings, isLoading, isError } = getListings();

  if (isLoading || loading) return <div>Spinner</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <NextSeo title="Your Listings" />
      <div className="space-x-2">
        <h2 className="inline-block m-6 text-primary-dark">Your Listings</h2>
          <PrimaryButton text="+ New Listing" href="listings/new" />
      </div>
      <ListingPreviewGrid listings={listings?.data} />
    </div>
  );
}
