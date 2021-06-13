import ListingPreviewGrid from "components/listing/previewGrid";
import ListingTabs from "components/listing/tabs";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function Listings() {
  const [session, loadingSession] = useSession();
  const router = useRouter();
  const { status } = router.query;

  function getListings() {
    const { data, error } = useSWR(
      session && status
        ? [`listings?status=${status}`, session.accessToken]
        : null
    );

    return {
      listings: data,
      loadingListings: !error && !data,
      isError: error,
    };
  }

  const { listings, loadingListings, isError } = getListings();

  function renderListings() {
    if (loadingListings || loadingSession) return <div>Spinner</div>;
    if (isError) return <div>Error</div>;
    return <ListingPreviewGrid listings={listings.data} />;
  }

  return (
    <div>
      <NextSeo title="Your Listings" />
      <ListingTabs activeTab={`${status}`}>{renderListings()}</ListingTabs>
    </div>
  );
}
