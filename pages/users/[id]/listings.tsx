import { useContext, useEffect, useState } from "react";

import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { UserListings } from "components/user/listings";
import { UserSettingsContext } from "contexts/userSettings";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ShowUserListings(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const [shipsTo, setShipsTo] = useState<string | null>(null);
  const { userSettings } = useContext(UserSettingsContext);

  useEffect(() => {
    setShipsTo(userSettings.country);
  }, [userSettings]);

  function getListings() {
    const query = Object.entries(router.query)
      .map((q) => {
        return q[0] + "=" + q[1];
      })
      .join("&");
    const { data, error } = useSWR(
      id && shipsTo ? `users/${id}/listings?ships_to=${shipsTo}&${query}` : null
    );

    return {
      listingsResponse: data,
      listingsLoading: !error && !data,
      listingsError: error,
    };
  }

  const { listingsResponse, listingsLoading, listingsError } = getListings();
  if (listingsLoading || !shipsTo) return <SpinnerLg text="Loading..." />;
  if (listingsError) return <div>Error</div>;

  const listings = listingsResponse.data;

  return (
    <div className="my-4">
      <PageContainer>
        <UserListings
          listings={listings.listings}
          totalPages={listings.total_pages}
          initialPage={Number(router.query.page)}
        />
      </PageContainer>
    </div>
  );
}
