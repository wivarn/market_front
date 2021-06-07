import AccountContainer from "components/accountContainer";
import { NextSeo } from "next-seo";
import ProfileForm from "components/forms/profile";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function profile() {
  const [session, loading] = useSession();

  function getProfile() {
    const { data, error } = useSWR(
      session ? ["profile", session.accessToken] : null
    );

    return {
      profile: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  const { profile, isLoading, isError } = getProfile();

  if (isLoading || loading) return <div>Spinner</div>;
  if (isError) return <div>Error</div>;

  return (
    <>
      <NextSeo title="Profile" />
      <AccountContainer activeTab="profile">
        <p>{JSON.stringify(profile.data)}</p>
      </AccountContainer>
    </>
  );
}
