import ListingPreviewGrid from "components/listing/previewGrid";
import ListingTabs from "components/listing/tabs";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function Listings(): JSX.Element {
  const [session, loadingSession] = useSession();
  const router = useRouter();
  const { state, page } = router.query;

  function getListings() {
    const query = Object.entries(router.query)
      .map((q) => {
        return q[0] + "=" + q[1];
      })
      .join("&");

    const { data, error } = useSWR(
      session && state ? [`listings?${query}`, session.accessToken] : null
    );

    return {
      response: data,
      loadingListings: !error && !data,
      isError: error,
    };
  }

  const { response, loadingListings, isError } = getListings();

  function renderListings() {
    if (loadingListings || loadingSession)
      return <SpinnerLg text="Loading..." />;
    if (isError) return <div>Error</div>;
    return (
      <ListingPreviewGrid
        listings={response.data.listings}
        totalPages={response.data.total_pages}
        initialPage={Number(page)}
      />
    );
  }

  return (
    <div className="my-4">
      <PageContainer yPadding="py-4">
        <NextSeo title="Your Listings" />
        <ListingTabs activeTab={`${state}`}>{renderListings()}</ListingTabs>
      </PageContainer>
    </div>
  );
}
