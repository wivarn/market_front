import { GenericErrorMessage } from "components/message";
import { IUser } from "types/user";
import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { UserInfo } from "components/user";
import { UserListingsPreview } from "components/user/listings";
import { UserReviewsPreview } from "components/user/reviews";
import { UserSettingsContext } from "contexts/userSettings";
import { useContext } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";

export default function ShowUser(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const [shipsTo, setShipsTo] = useState<string | null>(null);
  const { userSettings } = useContext(UserSettingsContext);

  useEffect(() => {
    setShipsTo(userSettings.country);
  }, [userSettings]);

  function getUser() {
    const { data, error } = useSWR(
      id ? `users/${id}?ships_to=${shipsTo}` : null
    );

    return {
      userResponse: data,
      userLoading: !error && !data,
      userError: error,
    };
  }

  const { userResponse, userLoading, userError } = getUser();
  if (userLoading || !shipsTo) return <SpinnerLg text="Loading..." />;
  if (userError)
    return (
      <PageContainer>
        <GenericErrorMessage />
      </PageContainer>
    );

  const user: IUser = userResponse.data;
  console.log(user);
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
          <UserListingsPreview listings={user.listings || []} />
        </PageContainer>
      </div>
      <div className="py-4">
        <PageContainer>
          <UserReviewsPreview />
        </PageContainer>
      </div>
    </div>
  );
}
