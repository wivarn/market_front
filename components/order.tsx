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

export default function Order({ order }: props): JSX.Element {
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
    <div className="border border-primary">
      <div>
        <span>
          <h4>
            Buyer:{" "}
            <Link href={`/users/${order.seller_id}/listings`}>
              <a>
                {order.seller.given_name} {order.seller.family_name}
              </a>
            </Link>
          </h4>
        </span>
        <span>
          <p>
            {order.address.street1}
            {order.address.street2}
            {order.address.city}, {order.address.state}
            {order.address.zip}, {order.address.country}
          </p>
        </span>
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
      <div>
        <span>Status: {order.aasm_state}</span>
        <span>Total = {order.total}</span>
      </div>
      <div>
        Tracking Number or URL:
        <OrderTrackingForm orderId={order.id} tracking={order.tracking} />
      </div>
      <SubmitButton text="Mark as shipped" onClick={shipOrder} />
    </div>
  );
}
