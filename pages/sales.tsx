import { GenericErrorMessage } from "components/message";
import { NextSeo } from "next-seo";
import { SpinnerLg } from "components/spinner";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function sales(): JSX.Element {
  const [session, sessionLoading] = useSession();

  function getSales() {
    const { data, error } = useSWR(
      session ? ["orders?view=sales", session.accessToken] : null
    );

    return {
      salesResponse: data,
      salesLoading: !error && !data,
      salesError: error,
    };
  }

  const { salesResponse, salesLoading, salesError } = getSales();

  if (salesLoading || sessionLoading) return <SpinnerLg text="Loading..." />;
  if (salesError) return <GenericErrorMessage />;

  return (
    <>
      <NextSeo title="Sales" />
      {JSON.stringify(salesResponse.data)}
    </>
  );
}
