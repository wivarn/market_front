import { CardContainer6xl } from "components/cardContainer";
import ListingDetails from "components/listing/details";
import { NextSeo } from "next-seo";
import { SpinnerLg } from "components/spinner";
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
  if (isLoading) return <SpinnerLg text="Loading..." />;
  if (isError) return <div>Error</div>;

  const listing = response.data;

  return (
    <>
      <NextSeo title={listing.title} />
      <CardContainer6xl>
        <ListingDetails
          id={listing.id}
          aasm_state={listing.aasm_state}
          accountId={listing.account_id}
          photos={listing.photos}
          title={listing.title}
          price={listing.price}
          currency={listing.currency}
          domestic_shipping={listing.domestic_shipping}
          international_shipping={listing.international_shipping}
          grading_company={listing.grading_company}
          condition={listing.condition}
          description={listing.description}
          sellerName={`${listing.given_name} ${listing.family_name}`}
        />
      </CardContainer6xl>
    </>
  );
}
