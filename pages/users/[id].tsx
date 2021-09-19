import { GenericErrorMessage } from "components/message";
import { IUser } from "types/user";
import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { UserInfo } from "components/user";
import { UserRecentListings } from "components/user/listings";
import { UserSettingsContext } from "contexts/userSettings";
import { useContext } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";

export default function ShowUser(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const [destinationCountry, setDestinationCountry] = useState<string | null>(
    null
  );
  const { userSettings } = useContext(UserSettingsContext);

  useEffect(() => {
    setDestinationCountry(userSettings.country);
  }, [userSettings]);

  function getUser() {
    const { data, error } = useSWR(
      id ? `users/${id}?destination_country=${destinationCountry}` : null
    );

    return {
      userResponse: data,
      userLoading: !error && !data,
      userError: error,
    };
  }

  const { userResponse, userLoading, userError } = getUser();
  if (userLoading || destinationCountry == null)
    return <SpinnerLg text="Loading..." />;
  if (userError)
    return (
      <PageContainer>
        <GenericErrorMessage />
      </PageContainer>
    );

  const user: IUser = userResponse.data;

  return (
    <div className="my-4">
      <PageContainer>
        <div className="grid mx-auto mb-4 justify-items-center">
          <h3 className="mb-4 text-center">User Profile</h3>
          <UserInfo {...user} />
        </div>
      </PageContainer>

      <div className="my-4">
        <PageContainer>
          <UserRecentListings listings={user.listings || []} />
        </PageContainer>
      </div>
    </div>
  );
}
