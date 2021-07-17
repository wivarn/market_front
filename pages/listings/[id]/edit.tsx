import { GenericErrorMessage } from "components/message";
import ListingForm from "components/forms/listing";
import { NextSeo } from "next-seo";
import { SpinnerLg } from "components/spinner";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function EditListing(): JSX.Element {
  const [session, sessionLoading] = useSession();
  const router = useRouter();
  const { id } = router.query;

  function getListing() {
    const { data, error } = useSWR(
      id && session ? [`listings/${id}/edit`, session.accessToken] : null
    );

    return {
      response: data,
      listingLoading: !error && !data,
      isError: error,
    };
  }

  const { response, isLoading, isError } = getListing();
  if (isLoading) return <SpinnerLg text="Loading..." />;
  if (isError) return <GenericErrorMessage></GenericErrorMessage>;

  const listing = response.data;
  return (
    <>
      <NextSeo title="Update Listing" />
      <ListingForm
        id={listing.id}
        aasm_state={listing.aasm_state}
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
