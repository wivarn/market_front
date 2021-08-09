import { ICart, ICartListing } from "types/listings";
import { useEffect, useState } from "react";

import { CartApi } from "services/backendApi/cart";
import { DeleteButton } from "components/buttons";
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
  // TODO: add cart type
  const [carts, setCarts] = useState<any>(null);
  const [error, setError] = useState(false);
  const [submittingCheckout, setSubmittingCheckout] = useState(false);
  const [submittingEmpty, setSubmittingEmpty] = useState(false);
  const [submittingEmptyAll, setSubmittingEmptyAll] = useState(false);

  useEffect(() => {
    if (sessionLoading) return;
    CartApi(session?.accessToken)
      .index()
      .then((cartsResponse) => {
        setCarts(cartsResponse.data);
      })
      .catch(() => {
        setError(true);
      });
  }, [sessionLoading]);

  async function checkout(sellerId: string) {
    setSubmittingCheckout(true);
    CartApi(session?.accessToken)
      .checkout(sellerId)
      .then(async (response) => {
        window.location.assign(response.data.url);
      })
      .finally(() => {
        setSubmittingCheckout(false);
      });
  }

  if (sessionLoading || !carts) return <SpinnerLg text="Loading..." />;
  if (error) return <GenericErrorMessage></GenericErrorMessage>;
  async function empty(sellerId: string) {
    setSubmittingEmpty(true);
    CartApi(session?.accessToken)
      .empty(sellerId)
      .then(() => {
        toast.success("Cart has been emptied");
      })
      .finally(() => {
        setSubmittingEmpty(false);
      });
  }

  async function emptyAll() {
    setSubmittingEmptyAll(true);
    CartApi(session?.accessToken)
      .emptyAll()
      .then(() => {
        toast.success("All carts have been emptied");
      })
      .finally(() => {
        setSubmittingEmptyAll(false);
      });
  }

  return (
    <div className="my-4">
      <NextSeo title="Cart" />

      <PageContainer>
        <h3 className="pb-2 text-center">Your Carts</h3>
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
                <div className="flex flex-wrap items-center space-x-4">
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
                    submitting={submittingCheckout}
                    onClick={() => checkout(cart.seller_id)}
                  />

                  <DeleteButton
                    text="Empty cart"
                    submitting={submittingEmpty}
                    onClick={() => empty(cart.seller_id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex justify-end mt-8 mr-8">
          <DeleteButton
            text="Empty all carts"
            onClick={() => emptyAll()}
            submitting={submittingEmptyAll}
          />
        </div>
      </PageContainer>
    </div>
  );
}
