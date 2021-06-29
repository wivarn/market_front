import { CartApi } from "services/backendApi/cart";
import { Listing } from "types/listings";
import { NextSeo } from "next-seo";
import { SpinnerLg } from "components/spinner";
import { SubmitButton } from "components/buttons";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function Cart(): JSX.Element {
  const [session, sessionLoading] = useSession();

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

  async function checkout() {
    CartApi(session?.accessToken)
      .checkout()
      .then(async (response) => {
        window.location.assign(response.data.url);
      });
  }

  const { response, loadingCart, isError } = getCart();

  if (sessionLoading || loadingCart) return <SpinnerLg text="Loading..." />;
  if (isError) return <div>Error</div>;
  const cart = response.data;

  return (
    <>
      <NextSeo title="Cart" />
      <h2>{cart.length} items in cart</h2>
      {cart.map((listing: Listing) => {
        return <div key={listing.id}>{listing.title}</div>;
      })}
      <SubmitButton text="Checkout" onClick={checkout} />
    </>
  );
}
