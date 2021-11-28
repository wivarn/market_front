import { useEffect, useState } from "react";

import { GenericErrorMessage } from "components/message";
import { IListingFormData } from "types/listings";
import { ListingApi } from "services/backendApi/listing";
import ListingForm from "components/forms/listing";
import { NextSeo } from "next-seo";
import { SpinnerLg } from "components/spinner";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function EditListing(): JSX.Element {
  const [session, sessionLoading] = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [listing, setListing] = useState<IListingFormData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionLoading || !router.isReady) return;
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
      <ListingForm {...listing} />
    </>
  );
}
