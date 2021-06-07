import ProfileForm from "components/forms/profile";
import { useSession } from "next-auth/client";
import { NextSeo } from "next-seo";
import useSWR from "swr";

export default function profile() {
  const [session, loading] = useSession();

  function getProfile() {
    const { data, error } = useSWR(
      session ? ["profile", session?.accessToken] : null
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
      <div className="p-4">
        <h2>Your Account</h2>
        <p>{JSON.stringify(profile?.data)}</p>
      </div>
    </>
  );
}
