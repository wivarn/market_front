import { AddressApi } from "services/backendApi/address";
import { GenericErrorMessage } from "components/message";
import { IUser } from "types/user";
import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { UserInfo } from "components/user";
import { UserListingsPreview } from "components/user/listings";
import { UserReviewsPreview } from "components/user/reviews";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function ShowUser(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const [session] = useSession();

  function getUser() {
    let shipsTo = "USA";
    if (session) {
      AddressApi(session?.accessToken)
        .get()
        .then((response) => {
          shipsTo = response.data ? response.data.country : "USA";
        });
    }
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
  if (userLoading) return <SpinnerLg text="Loading..." />;
  if (userError)
    return (
      <PageContainer>
        <GenericErrorMessage></GenericErrorMessage>
      </PageContainer>
    );

  const user: IUser = userResponse.data;

  return (
    <div className="my-4">
      <PageContainer>
        <div className="grid mb-4 text-center justify-items-center">
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
