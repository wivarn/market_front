import { CardContainerFull } from "components/cardContainer";
import ListingPreviewGrid from "components/listing/previewGrid";
import { NextSeo } from "next-seo";
import SearchFilter from "components/forms/listing/searchFilter";
import SearchSort from "components/forms/listing/searchSort";
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
    console.log(query);
    const { data, error } = useSWR(
      router.isReady ? `listings/search?${query}` : null
    );

    return {
      listings: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const { listings, isLoading, isError } = getListings();

  if (isLoading) return <div>Spinner</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="my-4">
      <NextSeo title="Search Results" />
      <SearchFilter />
      <SearchSort />
      <CardContainerFull>
        <h3 className="py-2 text-center border-b border-accent">
          Your search results
        </h3>
        <ListingPreviewGrid listings={listings?.data} />
      </CardContainerFull>
    </div>
  );
}
