import { ICart, ICartListing } from "types/listings";

import { CartApi } from "services/backendApi/cart";
import { GenericErrorMessage } from "components/message";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { SubmitButton } from "components/buttons";
import useSWR from "swr";
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

  const { cartResponse, loadingCart, cartError } = getCart();
  const { addressResponse, addressLoading, addressError } = getAddress();

  if (sessionLoading || loadingCart || addressLoading)
    return <SpinnerLg text="Loading..." />;
  if (cartError || addressError)
    return <GenericErrorMessage></GenericErrorMessage>;
  const carts = cartResponse.data;
  const address = addressResponse.data;

  return (
    <div className="my-8">
      <NextSeo title="Cart" />

      <PageContainer>
        <h3 className="pb-2 text-center">Your Cart</h3>
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
                  <div key={listing.id} className="mx-4 my-4 space-y-2">
                    <Link href={`/listings/${listing.id}`}>
                      <a className="flex hover:shadow-md">
                        <div className="container relative w-24 h-24">
                          <Image
                            src={listing.photos[0]}
                            alt={listing.title}
                            layout="fill"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADcSURBVHgBNY/PTgIxEMZ/065yUQ96QLyQoI/pE/kqxoMXjImaiCaCchDNamC3Hb4u7LSTtDPfnxk7vL5xDMwhK01v1ylhblR8f3bfvPgiLZb46hcmE+LVJdXwVIDVkvT0TH6dUbicj6CtSQ/3pEcp5Jcp+e5WvbTTPxnA7F+SGWIQ4H0qxryY6LbwpowChSCSU5lv1FiXkZRSqT86KzsbEYZjgjfNjl2aXeh9dEy8GMOmpvK/H8LBgNys6cMswlxD59TpusnPy1A9IERCjF0tsHe3skEfnrVUq7qzBVw1YRwIWDLVAAAAAElFTkSuQmCC"
                            className="rounded-l-md"
                          />
                        </div>
                        <div className="w-full p-2 border rounded-r-md">
                          <p className="line-clamp-1">{listing.title}</p>

                          <div>
                            <span className="font-semibold text-accent-darker">
                              {Number(listing.price).toLocaleString("en", {
                                style: "currency",
                                currency: "usd",
                              })}{" "}
                            </span>
                            <span className="text-xs text-accent-dark">
                              {listing.currency}
                            </span>
                            <div className="text-xs leading-none text-accent-dark">
                              +
                              {Number(
                                address.country == listing.shipping_country
                                  ? listing.domestic_shipping
                                  : listing.international_shipping
                              ).toLocaleString("en", {
                                style: "currency",
                                currency: "usd",
                              })}{" "}
                              Shipping
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
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
                    text="Proceed to checkout"
                    onClick={() => checkout(cart.seller_id)}
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
