import {
  CheckCircleIconXs,
  ClockIconXs,
  ErrorIconXs,
  InfoCircleSm,
} from "../icons";
import { IOrder, IOrdersPaginated } from "types/order";
import {
  IOverflowMenuItem,
  OverflowButton,
} from "components/buttons/overflowButton";
import { useEffect, useState } from "react";

import { BlankMessage } from "../message";
import CancelOrder from "./cancel";
import Link from "next/link";
import { ListingPreviewList } from "../listing/preview";
import { OrderApi } from "services/backendApi/order";
import { OrderRecommendForm } from "components/forms/order/feedback";
import OrderTrackingForm from "../forms/orderTracking";
import { Pagination } from "../pagination";
import ReactTooltip from "react-tooltip";
import { SpinnerLg } from "../spinner";
import { SubmitButton } from "../buttons";
import { mutate } from "swr";
import { stateMappings } from "constants/listings";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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
  const { data: session, status } = useSession();
  const sessionLoading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    setOrder(props.order);
  }, [props.order]);

  if (sessionLoading) return <SpinnerLg />;

  const sale = order.seller.id == session?.accountId;
  const refunded_total = order.refunded_total;
  const detailsHref = `/account/${sale ? "sales" : "purchases"}/${order.id}`;

  const orderDate = new Date(
    order.created_at.replace(/-/g, "/")
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  function renderState() {
    if (order.aasm_state == "cancelled") return stateMappings[order.aasm_state];
    if (refunded_total == order.total) return "Refunded";
    if (refunded_total) return "Partially Refunded";
    return stateMappings[order.aasm_state] || order.aasm_state;
  }

  function renderTransitionButton() {
    if (refunded_total) return null;
    if (sale) {
      if (order.aasm_state != "pending_shipment") return null;
    } else {
      if (!["pending_shipment", "shipped"].includes(order.aasm_state))
        return null;
    }

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

    const text = sale ? "Mark shipped" : "Mark received";
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
      text: `Message ${sale ? "Customer" : "Seller"}`,
    });

    if (sale && ["pending_shipment", "shipped"].includes(order.aasm_state)) {
      menuItems.push({
        href: `/account/sales/${order.id}/refund`,
        text: "Offer Refund",
      });
    }

    if (sale && order.aasm_state == "pending_shipment" && !refunded_total) {
      const openCancelModal = async () => {
        setCancelModal(true);
      };
      menuItems.push({
        href: `#`,
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

  function renderOrderInfo() {
    const order_user_id = sale ? order.buyer.id : order.seller.id;
    const order_user_name = sale
      ? order.buyer.full_name
      : order.seller.full_name;
    const order_user_label = sale ? "Sold To" : "Purchased From";
    return (
      <table className="w-full border-b table-fixed">
        <thead className="bg-accent-lighter">
          <tr className="text-sm md:text-base">
            <th className="w-1/3">Order Number</th>
            <th className="w-1/3">{order_user_label}</th>
            <th className="w-1/3">Order Date</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr className="text-sm md:text-base">
            <td>
              <Link href={detailsHref}>
                <a className="underline hover:text-primary">#{order.id}</a>
              </Link>
            </td>
            <td>
              <Link href={`/users/${order_user_id}`}>
                <a className="underline hover:text-primary">
                  {order_user_name}
                </a>
              </Link>
            </td>
            <td>{orderDate}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  const renderFeedback = () => {
    const review_text = () => {
      if (order.review?.recommend)
        return (
          <div className="flex items-center space-x-1 text-sm text-success">
            <CheckCircleIconXs />
            <div>Recommended</div>
          </div>
        );
      else if (order.review?.recommend === false)
        return (
          <div className="flex items-center space-x-1 text-sm text-error">
            <ErrorIconXs />
            <div>Not Recommended</div>
          </div>
        );
      else
        return (
          <div className="flex items-center space-x-1 text-sm text-warning-dark">
            <ClockIconXs />
            <div>Awaiting Feedback</div>
          </div>
        );
    };
    if (sale) {
      return (
        <div className="px-4 py-2 border-b bg-secondary-light">
          <div className="flex items-center space-x-1">
            <p className="text-sm font-semibold text-accent-darker">Review:</p>
            {review_text()}
          </div>
          <Link href={`${detailsHref}#order-${order.id}-feedback`}>
            <a className="text-sm underline text-info hover:text-primary">
              View Feedback
            </a>
          </Link>
        </div>
      );
    } else {
      return <OrderRecommendForm order={order} />;
    }
  };

  return (
    <>
      <CancelOrder
        open={cancelModal}
        setOpen={setCancelModal}
        order={order}
        setOrder={setOrder}
      />
      <div className="max-w-4xl mx-auto mt-4 rounded-md shadow-md">
        <div>
          <div className="relative flex items-center px-4 py-2 space-x-2 text-white bg-info-darker rounded-t-md">
            <div>
              <div className="text-xs">Status</div>
              <div className="text-sm font-bold md:text-base">
                {renderState()}
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
                Orders are marked as <br />
                received after 30 days
              </ReactTooltip>
            </span>
            <span className="absolute right-3">{renderOverflowButton()}</span>
          </div>
          {renderOrderInfo()}
          {renderFeedback()}
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
        <div className="px-4 py-2 text-white bg-info-darker rounded-b-md">
          <div className="text-right">
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
      </div>
    </>
  );
}
