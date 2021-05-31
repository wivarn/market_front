import ListingDetails from "components/listing/details";
import ListingForm from "components/forms/listing";
import { NextSeo } from "next-seo";
import api from "services/api";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/client";

const fetcher = (path: string) => api.get(path).then((res) => res);

export default function ShowListing() {
  const router = useRouter();
  const { id } = router.query;

  function getListing() {
    const { data, error } = useSWR(id ? `listings/${id}` : null, fetcher);

    return {
      response: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const [session, loading] = useSession();
  const { response, isLoading, isError } = getListing();
  if (isLoading || loading) return <div>Spinner</div>;
  if (isError) return <div>Error</div>;

  const listing = response?.data;
  const isSeller = session?.user?.id == listing.account_id;

  if (isSeller)
    return (
      <>
        <NextSeo title="Update Listing" />
        <ListingForm
          id={listing.id}
          photos={listing.photos}
          title={listing.title}
          price={listing.price}
          currency={listing.currency}
          domestic_shipping={listing.domestic_shipping}
          condition={listing.condition}
          description={listing.description}
        />
      </>
    );

  return (
    <>
      <NextSeo title={listing.title} />
      <ListingDetails
        photos={listing.photos}
        title={listing.title}
        price={listing.price}
        currency={listing.currency}
        domestic_shipping={listing.domestic_shipping}
        condition={listing.condition}
        description={listing.description}
        sellerName={`${listing.given_name} ${listing.family_name}`}
      />
    </>
  );
}
