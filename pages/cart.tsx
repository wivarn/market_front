import { NextSeo } from "next-seo";
import { SpinnerLg } from "components/spinner";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function Cart(): JSX.Element {
  const [session] = useSession();

  function getCart() {
    const { data, error } = useSWR(
      session ? ["cart", session.accessToken] : null
    );

    return {
      response: data,
      loadingCart: !error && !data,
      isError: error,
    };
  }

  const { response, loadingCart, isError } = getCart();

  if (loadingCart) return <SpinnerLg text="Loading..." />;
  if (isError) return <div>Error</div>;
  const cart = response.data;

  return (
    <>
      <NextSeo title="Cart" />
    </>
  );
}
