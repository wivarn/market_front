import { CardContainerFull } from "components/cardContainer";
import ListingPreviewGrid from "components/listing/previewGrid";
import { NextSeo } from "next-seo";
import SearchFilter from "components/forms/listing/searchFilter";
import SearchSort from "components/forms/listing/searchSort";
import { SpinnerPage } from "components/spinner";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Listings(): JSX.Element {
  const router = useRouter();

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
      isLoading: !error && !data,
      isError: error,
    };
  }

  const { response, isLoading, isError } = getListings();

  if (isLoading) return <SpinnerPage text="Loading..." />;
  if (isError) return <div>Error</div>;

  return (
    <div className="my-4">
      <NextSeo title="Search Results" />
      <CardContainerFull>
        <h3 className="py-2 text-center border-b border-accent">
          Your search results
        </h3>
        <div className="flex justify-between px-4 py-2">
          <SearchFilter />
          <SearchSort />
        </div>
        <ListingPreviewGrid
          listings={response.data.listings}
          totalPages={response.data.total_pages}
          initialPage={Number(router.query.page)}
        />
      </CardContainerFull>
    </div>
  );
}
