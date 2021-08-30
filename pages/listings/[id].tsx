import { BackButton } from "components/buttons";
import { GenericErrorMessage } from "components/message";
import { GetServerSideProps } from "next";
import { IlistingDetails } from "types/listings";
import { ListingApi } from "services/backendApi/listing";
import ListingDetails from "components/listing/details";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { UserSettingsContext } from "contexts/userSettings";
import { getSession } from "next-auth/client";
import { useContext } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ShowListing(
  props: IlistingDetails | Record<string, never>
): JSX.Element {
  let listing = props;

  const router = useRouter();
  const { id } = router.query;
  const { userSettings } = useContext(UserSettingsContext);
  const { country, default_settings } = userSettings;

  function getListing() {
    const { data, error } = useSWR(
      id && !default_settings
        ? `listings/${id}?destination_country=${country}`
        : null
    );

    return {
      response: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  if (!listing.id) {
    const { response, isLoading, isError } = getListing();
    if (isLoading) return <SpinnerLg text="Loading..." />;
    if (isError) return <GenericErrorMessage></GenericErrorMessage>;

    listing = response.data;
  }

  return (
    <div className="my-4">
      <PageContainer yPadding="py-2">
        <BackButton text="Back" />
        <NextSeo
          title={listing.title}
          description={listing.description}
          openGraph={{
            url: `https://skwirl.io/listings/${listing.id}`,
            title: `${listing.title}`,
            description: `${listing.description}`,
            images: [
              {
                url: `${listing.photos[0].url}`,
                width: 600,
                height: 800,
                alt: `${listing.title}`,
              },
            ],
            site_name: "Skwirl",
          }}
          twitter={{
            handle: "@skwirl_io",
            site: "@skwirl",
            cardType: "summary_large_image",
          }}
        />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) return { props: {} };

  const id = context?.params?.id;
  const listingResponse = await ListingApi().get(
    `${id}`,
    "destination_country=USA"
  );
  const listing: IlistingDetails = listingResponse.data;
  return {
    props: listing,
  };
};
