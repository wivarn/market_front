import { CardContainerFull } from "components/cardContainer";
import ListingPreviewGrid from "components/listing/previewGrid";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Listings(): JSX.Element {
  const router = useRouter();

  function getListings() {
    const { data, error } = useSWR(
      router.isReady ? `listings/search?title=${router.query.title}` : null
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
      <CardContainerFull>
        <NextSeo title="Search Results" />
        <h3 className="py-2 text-center border-b border-accent">
          Your search results
        </h3>
        <ListingPreviewGrid listings={listings?.data} />
      </CardContainerFull>
    </div>
  );
}
