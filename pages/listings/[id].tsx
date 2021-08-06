import { BackButton } from "components/buttons";
import { GenericErrorMessage } from "components/message";
import ListingDetails from "components/listing/details";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
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
  if (isError) return <GenericErrorMessage></GenericErrorMessage>;

  const listing = response.data;

  return (
    <>
      <NextSeo
        title={listing.title}
        description={listing.description}
        openGraph={{
          url: `https://skwirl.io/listings/${listing.id}`,
          title: `${listing.title}`,
          description: `${listing.description}`,
          images: [
            {
              url: `${listing.photo[0].url}`,
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
      <div className="my-4">
        <PageContainer yPadding="py-2">
          <BackButton text="Back" />
          <ListingDetails
            category={listing.category}
            subcategory={listing.subcategory}
            seller={listing.account}
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
          />
        </PageContainer>
      </div>
    </>
  );
}
