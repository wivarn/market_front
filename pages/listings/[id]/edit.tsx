import ListingForm from "components/forms/listing";
import { NextSeo } from "next-seo";
import { SpinnerLg } from "components/spinner";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function EditListing(): JSX.Element {
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
      <NextSeo title="Update Listing" />
      <ListingForm
        id={listing.id}
        state={listing.aasm_state}
        currency={listing.currency}
        category={listing.category || undefined}
        subcategory={listing.subcategory || undefined}
        title={listing.title}
        description={listing.description || undefined}
        grading_company={listing.grading_company || undefined}
        condition={listing.condition || undefined}
        photos={listing.photos || []}
        price={listing.price || undefined}
        domestic_shipping={listing.domestic_shipping || undefined}
        international_shipping={listing.international_shipping || undefined}
      />
    </>
  );
}
