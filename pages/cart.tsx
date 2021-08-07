import { ICart, ICartListing } from "types/listings";
import useSWR, { mutate } from "swr";

import { CartApi } from "services/backendApi/cart";
import { GenericErrorMessage } from "components/message";
import Link from "next/link";
import { ListingPreviewList } from "components/listing/preview";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { SubmitButton } from "components/buttons";
import { toast } from "react-toastify";
import { useSession } from "next-auth/client";

export default function Cart(): JSX.Element {
  const [session, sessionLoading] = useSession();

  function getCart() {
    const { data, error } = useSWR(
      session ? ["carts", session.accessToken] : null
    );

    return {
      cartResponse: data,
      loadingCart: !error && !data,
      cartError: error,
    };
  }

  function getAddress() {
    const { data, error } = useSWR(
      session ? ["account/address", session.accessToken] : null
    );

    return {
      addressResponse: data,
      addressLoading: !error && !data,
      addressError: error,
    };
  }

  async function checkout(sellerId: string) {
    CartApi(session?.accessToken)
      .checkout(sellerId)
      .then(async (response) => {
        window.location.assign(response.data.url);
      });
  }

  async function empty(sellerId: string) {
    CartApi(session?.accessToken)
      .empty(sellerId)
      .then(() => {
        toast.success("Cart is emptied");
        mutate(["carts", session?.accessToken]);
      });
  }

  async function emptyAll() {
    CartApi(session?.accessToken)
      .emptyAll()
      .then(() => {
        toast.success("All carts are emptied");
        mutate(["carts", session?.accessToken]);
      });
  }

  const { cartResponse, loadingCart, cartError } = getCart();
  const { addressLoading, addressError } = getAddress();

  if (sessionLoading || loadingCart || addressLoading)
    return <SpinnerLg text="Loading..." />;
  if (cartError || addressError)
    return <GenericErrorMessage></GenericErrorMessage>;
  const carts = cartResponse.data;

  return (
    <div className="my-8">
      <NextSeo title="Cart" />

      <PageContainer>
        <h3 className="pb-2 text-center">Your Cart</h3>
        <SubmitButton text="Empty All Carts" onClick={() => emptyAll()} />
        {carts.map((cart: ICart) => {
          return (
            <div
              key={cart.seller_id}
              className="max-w-4xl mx-auto mt-4 border rounded-md"
            >
              <h4 className="px-4 py-2 text-white rounded-t-md bg-info-darker">
                Seller:{" "}
                <Link href={`/users/${cart.seller_id}`}>
                  <a>{`${cart.given_name} ${cart.family_name}`}</a>
                </Link>
              </h4>
              {cart.listings.map((listing: ICartListing) => {
                return (
                  <ListingPreviewList
                    key={listing.id}
                    id={listing.id}
                    photos={listing.photos}
                    title={listing.title}
                    price={listing.price}
                    currency={listing.currency}
                    domestic_shipping={listing.domestic_shipping}
                    international_shipping={listing.international_shipping}
                    shipping_country={listing.shipping_country}
                  />
                );
              })}
              <div className="px-4 py-2 border-t bg-accent-lightest">
                <div className="flex items-center space-x-4">
                  <p>
                    Total={" "}
                    {Number(cart.total).toLocaleString("en", {
                      style: "currency",
                      currency: "usd",
                    })}{" "}
                    {cart.listings[0].currency}
                  </p>
                  <SubmitButton
                    text="Checkout"
                    onClick={() => checkout(cart.seller_id)}
                  />
                  <SubmitButton
                    text="Empty"
                    onClick={() => empty(cart.seller_id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </PageContainer>
    </div>
  );
}
