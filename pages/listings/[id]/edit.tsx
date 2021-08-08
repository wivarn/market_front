import { useEffect, useState } from "react";

import { GenericErrorMessage } from "components/message";
import { IListing } from "types/listings";
import { ListingApi } from "services/backendApi/listing";
import ListingForm from "components/forms/listing";
import { NextSeo } from "next-seo";
import { SpinnerLg } from "components/spinner";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

export default function EditListing(): JSX.Element {
  const [session, sessionLoading] = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [listing, setListing] = useState<IListing | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionLoading) return;
    ListingApi(session?.accessToken)
      .edit(`${id}`)
      .then((listingResponse) => {
        setListing(listingResponse.data);
      })
      .catch(() => {
        setError(true);
      });
  }, [sessionLoading, router.isReady]);

  if (sessionLoading || !listing) return <SpinnerLg text="Loading..." />;
  if (error) return <GenericErrorMessage></GenericErrorMessage>;

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
        combined_shipping={listing.combined_shipping || undefined}
      />
    </>
  );
}
