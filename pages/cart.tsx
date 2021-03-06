import { BlankMessage, GenericErrorMessage } from "components/message";
import { ICart, Ilisting } from "types/listings";
import { useEffect, useState } from "react";

import { CartApi } from "services/backendApi/cart";
import Image from "next/image";
import Link from "next/link";
import { ListingPreviewList } from "components/listing/preview";
import { NextSeo } from "next-seo";
import PageContainer from "components/pageContainer";
import ReactTooltip from "react-tooltip";
import { RemoveButton } from "components/buttons";
import { SpinnerLg } from "components/spinner";
import { SubmitButton } from "components/buttons";
import { UserSettingsContext } from "contexts/userSettings";
import { XIconSm } from "components/icons";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { redirectUnauthenticated } from "ultils/authentication";

export default function Cart(): JSX.Element {
  redirectUnauthenticated();
  const { data: session, status } = useSession();
  const sessionLoading = status === "loading";
  // TODO: add cart type
  const [carts, setCarts] = useState<any>(null);
  const [error, setError] = useState(false);
  const { userSettings, assignUserSettings } = useContext(UserSettingsContext);
  const [submittingCheckout, setSubmittingCheckout] = useState<{
    [key: string]: boolean;
  }>({});
  const [submittingRemove, setSubmittingRemove] = useState<{
    [key: string]: boolean;
  }>({});
  const [submittingEmpty, setSubmittingEmpty] = useState<{
    [key: string]: boolean;
  }>({});
  const anySubmitting = () => {
    return (
      Object.values(submittingCheckout).some((v: boolean) => v) ||
      Object.values(submittingEmpty).some((v: boolean) => v) ||
      Object.values(submittingRemove).some((v: boolean) => v)
    );
  };

  function fetchCarts() {
    CartApi(session?.accessToken)
      .index()
      .then((cartsResponse) => {
        setCarts(cartsResponse.data);
      })
      .catch(() => {
        setError(true);
      });
  }

  useEffect(() => {
    if (sessionLoading || !userSettings.address_set) return;
    fetchCarts();
  }, [sessionLoading, userSettings.address_set]);

  useEffect(() => {
    if (carts && !carts.length) {
      assignUserSettings({ ...userSettings, cart_items: [] });
    }
  }, [carts]);

  if (sessionLoading) return <SpinnerLg text="Loading..." />;
  if (!userSettings.address_set) {
    return (
      <PageContainer yPadding="my-8">
        <div className="container mt-8">
          <div className="grid items-center max-w-xl p-4 mx-auto rounded-md ">
            <Image src="/assets/cart.svg" height={400} width={400} />
            <div className="mt-4 text-lg text-center">
              <span>
                Please update your address before adding items to your cart.
                <br />
                <Link href="/account/address">
                  <a className="underline text-info">Update your address now</a>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
  if (!carts) return <SpinnerLg text="Loading..." />;
  if (error) return <GenericErrorMessage></GenericErrorMessage>;

  async function checkout(sellerId: string) {
    setSubmittingCheckout({ ...submittingCheckout, [sellerId]: true });
    CartApi(session?.accessToken)
      .checkout(sellerId)
      .then(async (response) => {
        window.location.assign(response.data.url);
      })
      .finally(() => {
        setSubmittingCheckout({ ...submittingCheckout, [sellerId]: false });
      });
  }

  async function removeItem(sellerId: string, listingId: string) {
    setSubmittingRemove({
      ...submittingRemove,
      [listingId]: true,
    });
    CartApi(session?.accessToken)
      .removeItem(sellerId, listingId)
      .then((cartsResponse) => {
        toast.success("Item removed from cart");
        const newCartItems = userSettings.cart_items.filter(
          (cart_item) => cart_item.listing_id != listingId
        );
        assignUserSettings({ ...userSettings, cart_items: newCartItems });
        setCarts(cartsResponse.data);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setSubmittingRemove({ ...submittingRemove, [listingId]: false });
      });
  }

  async function empty(sellerId: string) {
    setSubmittingEmpty({ ...submittingEmpty, [sellerId]: true });
    CartApi(session?.accessToken)
      .empty(sellerId)
      .then((cartsResponse) => {
        toast.success("Cart has been emptied");
        setCarts(cartsResponse.data);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setSubmittingEmpty({ ...submittingEmpty, [sellerId]: false });
      });
  }

  function renderCarts() {
    if (carts.length == 0) {
      return (
        <BlankMessage>
          <p>
            You have nothing in your cart.
            <br />{" "}
            <Link href="/">
              <a className="underline text-info hover:text-primary">
                Start shopping now
              </a>
            </Link>
          </p>
        </BlankMessage>
      );
    }

    return (
      <>
        {carts.map((cart: ICart) => {
          return renderCart(cart);
        })}
      </>
    );

    function renderCart(cart: ICart) {
      function notAvailable(listing: Ilisting): boolean {
        if (listing.accepted_offer) return false;
        return (
          listing.shipping == null ||
          (!cart.checkout_session_id && listing.aasm_state != "active")
        );
      }

      const disableCheckout = cart.listings.some(notAvailable);

      return (
        <div
          key={cart.seller.id}
          className="max-w-4xl mx-auto mt-4 border rounded-md"
        >
          <h5 className="relative px-4 py-2 text-white rounded-t-md bg-info-darker">
            Seller:{" "}
            <Link href={`/users/${cart.seller.id}`}>
              <a className="underline">{`${cart.seller.full_name}`}</a>
            </Link>
            <span className="absolute top-0 right-2">
              <RemoveButton
                text={<XIconSm />}
                submitting={submittingEmpty[cart.seller.id]}
                disabled={anySubmitting()}
                onClick={() => empty(cart.seller.id)}
              />
            </span>
          </h5>
          {cart.listings.map((listing: Ilisting) => {
            return (
              <span key={listing.id}>
                <div className="relative">
                  <ListingPreviewList {...listing} />
                  <div className="absolute top-1 right-6">
                    <RemoveButton
                      text={<XIconSm />}
                      disabled={anySubmitting()}
                      submitting={submittingRemove[cart.seller.id]}
                      onClick={() => removeItem(cart.seller.id, listing.id)}
                    />
                  </div>
                  {notAvailable(listing) ? (
                    <div className="absolute inset-0 grid justify-center w-full top-8">
                      <div className="w-64 h-10 grid-cols-1 p-2 text-center border rounded-md border-error bg-error-lightest text-error">
                        This item is no longer available
                      </div>
                    </div>
                  ) : null}
                </div>
              </span>
            );
          })}
          <div className="px-4 py-2 border-t bg-accent-lightest">
            <div className="flex flex-wrap items-center justify-end space-x-4">
              <div className="text-xs font-semibold text-accent-dark">
                Total:
                <div className="text-base text-accent-darker">
                  {Number(cart.total).toLocaleString("en", {
                    style: "currency",
                    currency: "usd",
                  })}{" "}
                  {cart.listings[0]?.currency}
                </div>
              </div>
              <span data-tip data-for="checkout">
                <SubmitButton
                  text={`${cart.checkout_session_id ? "Finish " : ""}Checkout`}
                  submitting={submittingCheckout[cart.seller.id]}
                  disabled={disableCheckout || anySubmitting()}
                  onClick={() => checkout(cart.seller.id)}
                />
                <ReactTooltip
                  id="checkout"
                  type="dark"
                  wrapper="span"
                  multiline={true}
                  place="top"
                  effect="solid"
                  disable={!disableCheckout}
                >
                  <div className="text-center">
                    There is a problem with items in your cart.
                    <br />
                    Please remove items before checking out.
                  </div>
                </ReactTooltip>
              </span>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="my-4">
      <NextSeo title="Cart" />
      <PageContainer>
        <h3 className="pb-2 text-center">Your Cart</h3>
        {renderCarts()}
      </PageContainer>
    </div>
  );
}
