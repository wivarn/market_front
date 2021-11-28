import { BlankMessage, GenericErrorMessage } from "components/message";

import { IListingsPaginated } from "types/listings";
import ListingPreviewGrid from "components/listing/previewGrid";
import ListingTabs from "components/listing/tabs";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function Listings(): JSX.Element {
  const { data: session, status } = useSession();
  const sessionLoading = status === "loading";
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
    if (loadingListings || sessionLoading)
      return <SpinnerLg text="Loading..." />;
    if (isError) return <GenericErrorMessage></GenericErrorMessage>;
    const paginatedListings: IListingsPaginated = response.data;
    if (!paginatedListings.meta.total_pages)
      return (
        <BlankMessage>
          <div className="p-2">You have no {state} listings.</div>
        </BlankMessage>
      );

    return (
      <ListingPreviewGrid
        listings={paginatedListings.listings}
        totalPages={paginatedListings.meta.total_pages}
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
