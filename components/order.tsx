import { IOrder, IOrdersPaginated } from "types/order";

import { BlankMessage } from "./message";
import { InfoCircleSm } from "./icons";
import Link from "next/link";
import { ListingPreviewList } from "./listing/preview";
import { OrderApi } from "services/backendApi/order";
import OrderTrackingForm from "./forms/orderTracking";
import { Pagination } from "./pagination";
import ReactTooltip from "react-tooltip";
import { SubmitButton } from "./buttons";
import { stateMappings } from "constants/listings";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useState } from "react";

interface props {
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
          return <SalesOrder key={order.id} order={order} />;
        })}
      </div>
      <Pagination initialPage={Number(page)} totalPages={totalPages} />
    </>
  );
}

export function SalesOrder(props: props): JSX.Element {
  const [order, setOrder] = useState(props.order);
  const orderDate = new Date(
    order.created_at.replace(/-/g, "/")
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const [submittingShipped, setSubmittingShipped] = useState(false);
  const [session] = useSession();

  async function shipOrder() {
    setSubmittingShipped(true);
    OrderApi(session?.accessToken)
      .updateState("sales", order.id, "ship")
      .then((response) => {
        setOrder(response.data);
        toast.success("Order marked as shipped");
      })
      .catch(() => {
        toast.error("Failed to mark order as shipped");
      })
      .finally(() => {
        setSubmittingShipped(false);
      });
  }

  return (
    <div className="max-w-4xl mx-auto mt-4 rounded-md shadow-md">
      <div>
        <div className="flex items-center px-4 py-2 space-x-4 text-white space-between justify-items-center bg-info-darker rounded-t-md">
          <div>
            <div className="text-xs">Status</div>
            <div className="font-bold">
              {stateMappings[order.aasm_state] || order.aasm_state}
            </div>
          </div>
          <SubmitButton
            text="Mark as shipped"
            onClick={shipOrder}
            disabled={order.aasm_state != "pending_shipment"}
            submitting={submittingShipped}
          />
          <span data-tip data-for="mark-as-shipped" className="text-center">
            <InfoCircleSm />
            <ReactTooltip
              id="mark-as-shipped"
              type="dark"
              wrapper="span"
              multiline={true}
              place="top"
              effect="solid"
            >
              Orders are automatically marked <br />
              as shipped after 30 days
            </ReactTooltip>
          </span>
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
              <td>#{order.id}</td>
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
      <div className="p-2 border-t bg-accent-lightest">
        <OrderTrackingForm orderId={order.id} tracking={order.tracking} />
      </div>
      <div className="px-4 py-2 font-bold text-right text-white bg-info-darker rounded-b-md">
        Total ={" "}
        {Number(order.total).toLocaleString("en", {
          style: "currency",
          currency: "usd",
        })}{" "}
        {order.listings[0].currency}
      </div>
    </div>
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
          return <PurchaseOrder key={order.id} order={order} />;
        })}
      </div>
      <Pagination initialPage={Number(page)} totalPages={totalPages} />
    </>
  );
}
export function PurchaseOrder(props: props): JSX.Element {
  const [order, setOrder] = useState(props.order);
  const orderDate = new Date(
    order.created_at.replace(/-/g, "/")
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const [submittingReceived, setSubmittingReceived] = useState(false);
  const [session] = useSession();
  const canReceive = ["pending_shipment", "shipped"].includes(order.aasm_state);

  async function receiveOrder() {
    setSubmittingReceived(true);
    OrderApi(session?.accessToken)
      .updateState("purchases", order.id, "receive")
      .then((response) => {
        setOrder(response.data);
        toast.success("Order marked as received");
      })
      .catch(() => {
        toast.error("Failed to mark order as received");
      })
      .finally(() => {
        setSubmittingReceived(false);
      });
  }

  return (
    <div className="max-w-4xl mx-auto mt-4 rounded-md shadow-md">
      <div>
        <div className="flex items-center px-4 py-2 space-x-2 text-white bg-info-darker rounded-t-md">
          <div>
            <div className="text-xs">Status</div>
            <div className="font-bold">
              {stateMappings[order.aasm_state] || order.aasm_state}
            </div>
          </div>
          <SubmitButton
            text="Mark as received"
            onClick={receiveOrder}
            disabled={!canReceive}
            submitting={submittingReceived}
          />
          <span data-tip data-for="mark-as-received" className="text-center">
            <InfoCircleSm />
            <ReactTooltip
              id="mark-as-received"
              type="dark"
              wrapper="span"
              multiline={true}
              place="top"
              effect="solid"
            >
              Orders are automatically marked <br />
              as received after 30 days
            </ReactTooltip>
          </span>
        </div>
        <table className="w-full border-b table-fixed">
          <thead className="bg-accent-lighter">
            <tr>
              <th className="w-1/3">Order Number</th>
              <th className="w-1/3">Order From</th>
              <th className="w-1/3">Order Date</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td>#{order.id}</td>
              <td>
                <Link href={`/users/${order.seller.id}`}>
                  <a className="underline hover:text-primary">
                    {order.seller.full_name}
                  </a>
                </Link>
              </td>
              <td>{orderDate}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex px-4 py-2 border-b text-accent-darker bg-accent-lightest">
          <span className="flex text-sm">
            Shipped to:{" "}
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
      {order.tracking ? (
        <p className="p-2 text-sm border-t bg-accent-lightest">
          Tracking Number: {order.tracking}
        </p>
      ) : null}
      <div className="px-4 py-2 font-bold text-right text-white bg-info-darker rounded-b-md">
        Total ={" "}
        {Number(order.total).toLocaleString("en", {
          style: "currency",
          currency: "usd",
        })}{" "}
        {order.listings[0].currency}
      </div>
    </div>
  );
}
