import { useContext, useEffect, useState } from "react";

import { BackButton } from "components/buttons";
import { GenericErrorMessage } from "components/message";
import ListingDetails from "components/listing/details";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { UserSettingsContext } from "contexts/userSettings";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ShowListing(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const [destinationCountry, setDestinationCountry] = useState<string | null>(
    null
  );
  const { userSettings } = useContext(UserSettingsContext);

  useEffect(() => {
    setDestinationCountry(userSettings.country);
  }, [userSettings]);

  function getListing() {
    const { data, error } = useSWR(
      id && destinationCountry
        ? `listings/${id}?destination_country=${destinationCountry}`
        : null
    );

    return {
      response: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const { response, isLoading, isError } = getListing();
  if (isLoading || !destinationCountry) return <SpinnerLg text="Loading..." />;
  if (isError) return <GenericErrorMessage></GenericErrorMessage>;

  const listing = response.data;

  return (
    <div className="my-4">
      <PageContainer yPadding="py-2">
        <BackButton text="Back" />
        <NextSeo title={listing.title} />
        <ListingDetails
          category={listing.category}
          subcategory={listing.subcategory}
          seller={listing.seller}
          id={listing.id}
          aasm_state={listing.aasm_state}
          photos={listing.photos}
          title={listing.title}
          price={listing.price}
          currency={listing.currency}
          shipping={listing.shipping}
          combined_shipping={listing.combined_shipping}
          grading_company={listing.grading_company}
          condition={listing.condition}
          description={listing.description}
        />
      </PageContainer>
    </div>
  );
}
