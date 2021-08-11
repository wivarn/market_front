import { IOrder } from "types/order";
import Link from "next/link";
import { ListingPreviewList } from "./listing/preview";
import { OrderApi } from "services/backendApi/order";
import OrderTrackingForm from "./forms/orderTracking";
import { SubmitButton } from "./buttons";
import { toast } from "react-toastify";
import { useSession } from "next-auth/client";
import { useState } from "react";

interface props {
  order: IOrder;
}

export function SalesOrder({ order }: props): JSX.Element {
  const orderDate = new Date(order.created_at).toLocaleDateString("en-US", {
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
      .then(() => {
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
          <p className="font-bold text-center">Status: {order.aasm_state} </p>
          <SubmitButton
            text="Mark as shipped"
            onClick={shipOrder}
            submitting={submittingShipped}
          />
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
                </Link>{" "}
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
          return (
            <ListingPreviewList
              key={listing.id}
              id={listing.id}
              photos={listing.photos}
              title={listing.title}
              price={listing.price}
              currency={listing.currency}
              shipping={listing.shipping}
            />
          );
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

export function PurchaseOrder({ order }: props): JSX.Element {
  const orderDate = new Date(order.created_at).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const [submittingReceived, setSubmittingReceived] = useState(false);
  const [session] = useSession();

  async function receiveOrder() {
    setSubmittingReceived(true);
    OrderApi(session?.accessToken)
      .updateState("ship", order.id, "receive")
      .then(() => {
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
        <div className="flex items-center px-4 py-2 space-x-4 text-white space-between justify-items-center bg-info-darker rounded-t-md">
          <p className="font-bold text-center">Status: {order.aasm_state} </p>
          <SubmitButton
            text="Mark as received"
            onClick={receiveOrder}
            submitting={submittingReceived}
          />
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
                <Link href={`/users/${order.buyer.id}`}>
                  <a className="underline hover:text-primary">
                    {order.seller.full_name}
                  </a>
                </Link>{" "}
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
          return (
            <ListingPreviewList
              key={listing.id}
              id={listing.id}
              photos={listing.photos}
              title={listing.title}
              price={listing.price}
              currency={listing.currency}
              shipping={listing.shipping}
            />
          );
        })}
      </div>
      <p className="p-2 text-sm border-t bg-accent-lightest">
        Tracking Number: {order.tracking}
      </p>
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
