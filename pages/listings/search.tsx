import { BlankMessage, GenericErrorMessage } from "components/message";

import { IListingsPaginated } from "types/listings";
import ListingPreviewGrid from "components/listing/previewGrid";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import SearchFilter from "components/forms/listing/searchFilter";
import { SearchSort } from "components/forms/listing/sort";
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
    const paginatedListings: IListingsPaginated = response.data;
    if (!paginatedListings.meta.total_pages)
      return (
        <BlankMessage>
          <div className="p-2">
            There are no listings matching that search. Try updating your search
            or filter settings.
          </div>
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
      <NextSeo title="Search Results" />
      <PageContainer yPadding="py-4">
        <div className="grid items-center justify-between grid-cols-4 mb-8 justify-items-center">
          <SearchFilter />
          <h3 className="col-span-2">Search Results</h3>
          <SearchSort />
        </div>
        {renderListings()}
      </PageContainer>
    </div>
  );
}
