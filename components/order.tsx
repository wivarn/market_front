import { IOrder } from "types/order";
import Link from "next/link";
import { ListingPreviewList } from "./listing/preview";
import { OrderApi } from "services/backendApi/order";
import OrderTrackingForm from "./forms/orderTracking";
import { SubmitButton } from "./buttons";
import { toast } from "react-toastify";
import { useSession } from "next-auth/client";

interface props {
  order: IOrder;
}

export function SalesOrder({ order }: props): JSX.Element {
  const [session] = useSession();

  async function shipOrder() {
    OrderApi(session?.accessToken)
      .updateState("sales", order.id, "ship")
      .then(() => {
        toast.success("Order marked as shipped");
      })
      .catch(() => {
        toast.error("Failed to mark order as shipped");
      });
  }

  return (
    <div className="max-w-4xl mx-auto mt-4 border rounded-md">
      <div>
        <div className="px-4 py-2 text-white rounded-t-md bg-info-darker">
          <h4>
            Order: #{order.id} by{" "}
            <Link href={`/users/${order.buyer_id}`}>
              <a className="underline hover:text-primary">
                {order.buyer.given_name} {order.buyer.family_name}
              </a>
            </Link>
          </h4>
          <span className="flex items-center space-x-4">
            <h5>Status: {order.aasm_state}</h5>
            <SubmitButton text="Mark as shipped" onClick={shipOrder} />
          </span>
        </div>
        <div className="px-4 py-2 text-accent-dark">
          <p className="text-sm">
            Ship to:
            <br /> {order.buyer.given_name} {order.buyer.family_name}
            <br />
            {order.address.street1} {order.address.street2} <br />
            {order.address.city}, {order.address.state} <br />
            {order.address.zip}, {order.address.country}
          </p>
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
              domestic_shipping={listing.domestic_shipping}
              international_shipping={listing.international_shipping}
              shipping_country={listing.shipping_country}
            />
          );
        })}
      </div>
      <div className="px-4 py-2 border-t bg-accent-lightest">
        <div className="flex items-center space-x-4">
          <p>
            Total={" "}
            {Number(order.total).toLocaleString("en", {
              style: "currency",
              currency: "usd",
            })}{" "}
            {order.listings[0].currency}
          </p>
        </div>
      </div>
      <div className="px-4 py-2 bg-accent-lightest">
        <OrderTrackingForm orderId={order.id} tracking={order.tracking} />
      </div>
    </div>
  );
}

export function PurchaseOrder({ order }: props): JSX.Element {
  const [session] = useSession();

  async function receiveOrder() {
    OrderApi(session?.accessToken)
      .updateState("ship", order.id, "receive")
      .then(() => {
        toast.success("Order marked as received");
      })
      .catch(() => {
        toast.error("Failed to mark order as received");
      });
  }

  return (
    <div className="max-w-4xl mx-auto mt-4 border rounded-md">
      <div>
        <div className="px-4 py-2 text-white rounded-t-md bg-info-darker">
          <h4>
            Order: #{order.id} from{" "}
            <Link href={`/users/${order.seller_id}`}>
              <a className="underline hover:text-primary">
                {order.seller.given_name} {order.seller.family_name}
              </a>
            </Link>
          </h4>
          <span className="flex items-center space-x-4">
            <h5>Status: {order.aasm_state}</h5>
            <SubmitButton text="Mark as received" onClick={receiveOrder} />
          </span>
        </div>
        <div className="px-4 py-2 text-accent-dark">
          <p className="text-sm">
            Shipped to:
            <br /> {order.buyer.given_name} {order.buyer.family_name}
            <br />
            {order.address.street1} {order.address.street2} <br />
            {order.address.city}, {order.address.state} <br />
            {order.address.zip}, {order.address.country}
          </p>
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
              domestic_shipping={listing.domestic_shipping}
              international_shipping={listing.international_shipping}
              shipping_country={listing.shipping_country}
            />
          );
        })}
      </div>
      <div className="px-4 py-2 border-t bg-accent-lightest">
        <div className="flex items-center space-x-4">
          <p>
            Total={" "}
            {Number(order.total).toLocaleString("en", {
              style: "currency",
              currency: "usd",
            })}{" "}
            {order.listings[0].currency}
          </p>
        </div>
      </div>
      <div className="px-4 py-2 bg-accent-lightest">
        Tracking: {order.tracking}
      </div>
    </div>
  );
}
