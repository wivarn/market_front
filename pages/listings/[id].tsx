import ListingDetails from "components/listing/details";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ShowListing(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  function getListing() {
    const { data, error } = useSWR(id ? `listings/${id}` : null);

    return {
      response: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const { response, isLoading, isError } = getListing();
  if (isLoading) return <div>Spinner</div>;
  if (isError) return <div>Error</div>;

  const listing = response.data;

  return (
    <>
      <NextSeo title={listing.title} />
      <ListingDetails
        id={listing.id}
        accountId={listing.account_id}
        photos={listing.photos}
        title={listing.title}
        price={listing.price}
        currency={listing.currency}
        domestic_shipping={listing.domestic_shipping}
        international_shipping={listing.international_shipping}
        condition={listing.condition}
        description={listing.description}
        sellerName={`${listing.given_name} ${listing.family_name}`}
      />
    </>
  );
}
