import { CartApi } from "services/backendApi/cart";
import { ICart, ICartListing } from "types/listings";
import Link from "next/link";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import { SpinnerLg } from "components/spinner";
import { SubmitButton } from "components/buttons";
import useSWR from "swr";
import { useSession } from "next-auth/client";
import Image from "next/image";

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
  if (cartError || addressError) return <div>Error</div>;
  const carts = cartResponse.data;
  const address = addressResponse.data;

  console.log(carts);
  console.log(address);

  return (
    <>
      <NextSeo title="Cart" />
      <PageContainer>
        <h2>Carts</h2>
        {carts.map((cart: ICart) => {
          return (
            <div key={cart.seller_id} className="border">
              <h3>
                Seller:{" "}
                <Link href={`/users/${cart.seller_id}`}>
                  <a>{`${cart.given_name} ${cart.family_name}`}</a>
                </Link>
              </h3>
              {cart.listings.map((listing: ICartListing) => {
                return (
                  <div key={listing.id} className="flex">
                    <div className="container relative w-20 h-20">
                      <Image
                        src={listing.photos[0]}
                        alt={listing.title}
                        layout="fill"
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFlSURBVHgBFY/JbtNQAEWP/Z7t4LR26jgDEdCyoBSJYc2uAjYg2MEn8Et8CkhILFgwFJDYVJTSCAmJtE4ztU0d+8XDq3uluzvS0TGev3qtm57g2mqKVJpzNSTLl2RLRVL9x/6SpUowXbfO/Q3By2ePeHiloGdKtlSXYDZkw5hzOa1LzBurOb40sT6/Yavo83S7zePee0b+Jp5T0PEsGjWBNIVEGyXWdRv/xQN+fmgTdu7yJN/lUHnUbAfqJbIbNlnzc9JBSOpDSx1Qv9mgkQQcT01qliBLK7DduoowIr4fRtyzTvg9gNkfl0anWQVFpIkmXsRIzwtwSsW7PRjsrfB1HrF9u8vOpz7rtzTHozOysoqZzCYkWYEQ0F5pUueUwPfZXO/h2hLDNMgLjRyOJ8zL/2TTIwZhizTPGP3bZxodEN4RlBocx8bY/bKjv318Sxz/xagUiZpjOy6LONHD8YJf/THBWsAFu1mYYHGmVmwAAAAASUVORK5CYII="
                        className="rounded-t-md"
                      />
                    </div>
                    <Link href={`/listings/${listing.id}`}>
                      {listing.title}
                    </Link>
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
                );
              })}
              <div>
                Total ={" "}
                {Number(cart.total).toLocaleString("en", {
                  style: "currency",
                  currency: "usd",
                })}{" "}
                {cart.listings[0].currency}
                <SubmitButton
                  text="Checkout"
                  onClick={() => checkout(cart.seller_id)}
                />
              </div>
            </div>
          );
        })}
      </PageContainer>
    </>
  );
}
