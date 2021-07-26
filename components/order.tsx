import { IOrder } from "types/order";
import Link from "next/link";
import { ListingPreviewTile } from "./listing/preview";

interface props {
  order: IOrder;
}

export default function Order({ order }: props): JSX.Element {
  return (
    <div>
      <div>
        <span>
          <h2>
            Buyer:{" "}
            <Link href={`/users/${order.seller_id}/listings`}>
              <a>
                {order.seller.given_name} {order.seller.family_name}
              </a>
            </Link>
          </h2>
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
            <ListingPreviewTile
              key={listing.id}
              id={listing.id}
              aasm_state={listing.aasm_state}
              photos={listing.photos}
              title={listing.title}
              price={listing.price}
              currency={listing.currency}
              domestic_shipping={listing.domestic_shipping}
              international_shipping={listing.international_shipping}
              grading_company={listing.grading_company}
              condition={listing.condition}
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
        {order.tracking}
      </div>
    </div>
  );
}
