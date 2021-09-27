import { IOrder, IOrdersPaginated } from "types/order";
import {
  IOverflowMenuItem,
  OverflowButton,
} from "components/buttons/overflowButton";

import { BlankMessage } from "../message";
import CancelOrder from "./cancel";
import { InfoCircleSm } from "../icons";
import Link from "next/link";
import { ListingPreviewList } from "../listing/preview";
import { OrderApi } from "services/backendApi/order";
import OrderTrackingForm from "../forms/orderTracking";
import { Pagination } from "../pagination";
import ReactTooltip from "react-tooltip";
import { SpinnerLg } from "../spinner";
import { SubmitButton } from "../buttons";
import { mutate } from "swr";
import { stateMappings } from "constants/listings";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useState } from "react";

interface IOrderProps {
  order: IOrder;
}

export function SalesOrders(props: IOrdersPaginated): JSX.Element {
  const { page } = useRouter().query;
  const sales = props.orders;
  const totalPages = props.meta.total_pages;
  if (sales.length == 0) {
    return (
      <BlankMessage>
        <p>
          You have not made any sales yet.
          <br />{" "}
          <Link href="/listings?state=active&sort=newest">
            <a className="underline text-info hover:text-primary">
              Start selling now
            </a>
          </Link>
        </p>
      </BlankMessage>
    );
  }

  return (
    <>
      <div>
        {sales.map((order: IOrder) => {
          return <Order key={order.id} order={order} />;
        })}
      </div>
      <Pagination initialPage={Number(page)} totalPages={totalPages} />
    </>
  );
}

export function PurchaseOrders(props: IOrdersPaginated): JSX.Element {
  const { page } = useRouter().query;
  const purchases = props.orders;
  const totalPages = props.meta.total_pages;
  if (purchases?.length == 0) {
    return (
      <BlankMessage>
        <p>
          You have not made any purchases yet.
          <br />{" "}
          <Link href="/">
            <a className="underline text-info hover:text-primary">
              Start buying now
            </a>
          </Link>
        </p>
      </BlankMessage>
    );
  }
  return (
    <>
      <div>
        {purchases.map((order: IOrder) => {
          return <Order key={order.id} order={order} />;
        })}
      </div>
      <Pagination initialPage={Number(page)} totalPages={totalPages} />
    </>
  );
}

export function Order(props: IOrderProps): JSX.Element {
  const [order, setOrder] = useState(props.order);
  const [submittingTransition, setSubmittingTransition] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [session, sessionLoading] = useSession();
  const router = useRouter();

  if (sessionLoading) return <SpinnerLg />;

  const sale = order.seller.id == session?.accountId;
  const detailsHref = `/account/${sale ? "sales" : "purchases"}/${order.id}`;

  const orderDate = new Date(
    order.created_at.replace(/-/g, "/")
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  function renderTransitionButton() {
    const noButton = sale
      ? order.aasm_state != "pending_shipment"
      : !["pending_shipment", "shipped"].includes(order.aasm_state);
    if (noButton) return <></>;

    async function shipOrder() {
      setSubmittingTransition(true);
      OrderApi(session?.accessToken)
        .updateState("sales", order.id, "ship")
        .then((response) => {
          setOrder(response.data);
          mutate([`orders/${order.id}?relation=sales`, session?.accessToken]);
          toast.success("Order marked as shipped");
        })
        .catch(() => {
          toast.error("Failed to mark order as shipped");
        })
        .finally(() => {
          setSubmittingTransition(false);
        });
    }

    async function receiveOrder() {
      setSubmittingTransition(true);
      OrderApi(session?.accessToken)
        .updateState("purchases", order.id, "receive")
        .then((response) => {
          setOrder(response.data);
          mutate([
            `orders/${order.id}?relation=purchases`,
            session?.accessToken,
          ]);
          toast.success("Order marked as received");
        })
        .catch(() => {
          toast.error("Failed to mark order as received");
        })
        .finally(() => {
          setSubmittingTransition(false);
        });
    }

    const text = sale ? "Mark as shipped" : "Mark as received";
    const onClick = sale ? shipOrder : receiveOrder;

    return (
      <SubmitButton
        text={text}
        onClick={onClick}
        submitting={submittingTransition}
      />
    );
  }

  function renderOverflowButton() {
    const menuItems: IOverflowMenuItem[] = [];

    if (!router.query.id) {
      menuItems.push({ href: detailsHref, text: "View Order Details" });
    }

    menuItems.push({
      href: `/messages/${sale ? order.buyer.id : order.seller.id}`,
      text: `Message ${sale ? "Buyer" : "Seller"}`,
    });

    if (
      sale &&
      ["pending_shipment", "shipped", "received", "refunded"].includes(
        order.aasm_state
      )
    ) {
      menuItems.push({
        href: `/account/sales/${order.id}/refund#refund-${order.id}`,
        text: "Offer Refund",
      });
    }

    if (sale && order.aasm_state == "pending_shipment") {
      const openCancelModal = async () => {
        setCancelModal(true);
      };
      menuItems.push({
        href: `#cancel-order-${order.id}`,
        text: "Cancel Order",
        onClick: openCancelModal,
      });
    }

    return (
      <OverflowButton menutItems={menuItems} menuItemsClassName="-right-8" />
    );
  }

  function renderTracking() {
    if (sale) {
      return (
        <div className="p-2 border-t bg-accent-lightest">
          <OrderTrackingForm orderId={order.id} tracking={order.tracking} />
        </div>
      );
    }
    if (order.tracking) {
      return (
        <p className="p-2 text-sm border-t bg-accent-lightest">
          Tracking Number: {order.tracking}
        </p>
      );
    }
  }

  return (
    <>
      <CancelOrder open={cancelModal} setOpen={setCancelModal} order={order} />
      <div className="max-w-4xl mx-auto mt-4 rounded-md shadow-md">
        <div>
          <div className="relative flex items-center px-4 py-2 space-x-2 text-white bg-info-darker rounded-t-md">
            <div>
              <div className="text-xs">Status</div>
              <div className="font-bold">
                {stateMappings[order.aasm_state] || order.aasm_state}
              </div>
            </div>
            {renderTransitionButton()}
            <span
              data-tip
              data-for="mark-as-shipped"
              className="text-xs text-center"
            >
              <InfoCircleSm />
              <ReactTooltip
                id="mark-as-shipped"
                type="dark"
                wrapper="span"
                multiline={true}
                place="top"
                effect="solid"
              >
                Orders are marked <br />
                as shipped after 30 days
              </ReactTooltip>
            </span>
            <span className="absolute right-3">{renderOverflowButton()}</span>
          </div>
          <table className="w-full border-b table-fixed">
            <thead className="bg-accent-lighter">
              <tr>
                <th className="w-1/3">Order Number</th>
                <th className="w-1/3">Order By</th>
                <th className="w-1/3">Order Date</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>
                  <Link href={detailsHref}>
                    <a className="underline hover:text-primary">#{order.id}</a>
                  </Link>
                </td>
                <td>
                  <Link href={`/users/${order.buyer.id}`}>
                    <a className="underline hover:text-primary">
                      {order.buyer.full_name}
                    </a>
                  </Link>
                </td>
                <td>{orderDate}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex px-4 py-2 border-b text-accent-darker bg-accent-lightest">
            <span className="flex text-sm">
              Ship to:{" "}
              <span className="px-2 text-sm">
                {order.buyer.full_name}
                <br />
                {order.address.street1} {order.address.street2} <br />
                {order.address.city}, {order.address.state} <br />
                {order.address.zip}, {order.address.country}
              </span>
            </span>
          </div>
        </div>
        <div>
          {order.listings.map((listing) => {
            return <ListingPreviewList key={listing.id} {...listing} />;
          })}
        </div>
        {renderTracking()}
        <div className="px-4 py-2 text-right text-white bg-info-darker rounded-b-md">
          <div className="text-xs">Total</div>
          <div className="font-bold">
            {Number(order.total).toLocaleString("en", {
              style: "currency",
              currency: "usd",
            })}{" "}
            {order.currency}
          </div>
        </div>
      </div>
    </>
  );
}
