import ListingPreviewGrid from "components/listing/previewGrid";
import { NextSeo } from "next-seo";
import { PrimaryButton } from "components/buttons";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function Listings() {
  const [session, loading] = useSession();

  function getListings() {
    const { data, error } = useSWR(
      session ? ["listings", session.accessToken] : null
    );

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
        <h2 className="inline-block m-6 text-accent-darkest">Your Listings</h2>
        <PrimaryButton text="+ New Listing" href="listings/new" />
      </div>
      <ListingPreviewGrid listings={listings.data} />
    </div>
  );
}
