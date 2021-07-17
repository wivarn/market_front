import { SpinnerLg } from "components/spinner";
import { UserListings } from "components/user/listings";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ShowUserListings(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  function getListings() {
    const query = Object.entries(router.query)
      .map((q) => {
        return q[0] + "=" + q[1];
      })
      .join("&");
    const { data, error } = useSWR(
      id ? `users/${id}/listings?=${query}` : null
    );

    return {
      listingsResponse: data,
      listingsLoading: !error && !data,
      listingsError: error,
    };
  }

  const { listingsResponse, listingsLoading, listingsError } = getListings();
  if (listingsLoading) return <SpinnerLg text="Loading..." />;
  if (listingsError) return <div>Error</div>;

  const listings = listingsResponse.data;

  return (
    <UserListings
      listings={listings.listings}
      totalPages={listings.total_pages}
      initialPage={Number(router.query.page)}
    />
  );
}
