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
import { getSession } from "next-auth/react";
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
  const { country } = userSettings;

  function getListing() {
    const { data, error } = useSWR(
      id ? `listings/${id}?destination_country=${country}` : null
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
        <div className="absolute">
          <BackButton text="Back" />
        </div>
        <NextSeo
          title={listing.title}
          description={`Find the best sports cards, trading card games and collectibles on the Skwirl marketplace. Get the best deals for ${listing.title} and lowest online prices. Free shipping for many products!`}
          openGraph={{
            type: "website",
            url: process.env.NEXT_PUBLIC_VERCEL_URL + router.asPath,
            title: `${listing.title}`,
            description: `Find the best sports cards, trading card games and collectibles on the Skwirl marketplace. Get the best deals for ${listing.title} and lowest online prices. Free shipping for many products!`,
            images: [
              {
                url: `${listing.photos[0].url}`,
                width: 300,
                height: 400,
                alt: `${listing.title}`,
              },
            ],
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
          accept_offers={listing.accept_offers}
          currency={listing.currency}
          shipping={listing.shipping}
          combined_shipping={listing.combined_shipping}
          grading_company={listing.grading_company}
          condition={listing.condition}
          description={listing.description}
          reserved_at={listing.reserved_at}
        />
      </PageContainer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) return { props: {} };

  const id = context?.params?.id;
  const listingResponse = await ListingApi().get(`${id}`);
  const listing: IlistingDetails = listingResponse.data;
  return {
    props: listing,
  };
};
