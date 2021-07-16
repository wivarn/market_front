import { GenericErrorMessage } from "components/message";
import ListingPreviewGrid from "components/listing/previewGrid";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import SearchFilter from "components/forms/listing/searchFilter";
import SearchSort from "components/forms/listing/searchSort";
import { SpinnerLg } from "components/spinner";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Listings(): JSX.Element {
  const router = useRouter();
  const { page } = router.query;

  function getListings() {
    const query = Object.entries(router.query)
      .map((q) => {
        return q[0] + "=" + q[1];
      })
      .join("&");
    const { data, error } = useSWR(
      router.isReady ? `listings/search?${query}` : null
    );

    return {
      response: data,
      loadingListings: !error && !data,
      isError: error,
    };
  }

  const { response, loadingListings, isError } = getListings();

  function renderListings() {
    if (loadingListings) return <SpinnerLg text="Loading..." />;
    if (isError) return <GenericErrorMessage></GenericErrorMessage>;
    if (!response.data.total_pages) return <div>no listings</div>;

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
      <NextSeo title="Search Results" />
      <PageContainer yPadding="py-4">
        <h3 className="py-2 text-center border-b border-accent">
          Your search results
        </h3>
        <div className="flex justify-between px-4 py-2">
          <SearchFilter />
          <SearchSort />
        </div>
        {renderListings()}
      </PageContainer>
    </div>
  );
}
