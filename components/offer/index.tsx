import {
  IOverflowMenuItem,
  OverflowButton,
} from "components/buttons/overflowButton";

import { IOffer } from "types/offer";
import Link from "next/dist/client/link";
import { ListingPreviewList } from "components/listing/preview";
import { useRouter } from "next/router";

export function Offer(props: IOffer): JSX.Element {
  const router = useRouter();
  const counter = props.counter;

  function renderOverflowButton() {
    const menuItems: IOverflowMenuItem[] = [];

    menuItems.push({
      href: `/messages/${counter ? props.buyer.id : props.seller.id}`,
      text: `Message ${counter ? "Buyer" : "Seller"}`,
    });

    menuItems.push({
      href: `/offer/cancel`,
      text: "Cancel Offer",
    });

    menuItems.push({
      href: `#`,
      text: "View History",
    });

    return (
      <OverflowButton menutItems={menuItems} menuItemsClassName="-right-8" />
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-4 rounded-md shadow-md">
      <div>
        <div className="relative flex items-center px-4 py-2 space-x-2 text-white bg-info-darker rounded-t-md">
          Offer Sent
          <span className="absolute right-3">{renderOverflowButton()}</span>
        </div>
        <table className="w-full border-b table-fixed">
          <thead className="bg-accent-lighter">
            <tr className="text-sm md:text-base">
              <th className="w-1/3">Offer To</th>
              <th className="w-1/3">Time Remaining</th>
              <th className="w-1/3">Offer Amount</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr className="text-sm md:text-base">
              <td>
                <Link href={`/users/${props.seller.id}`}>
                  <a className="underline hover:text-primary">
                    {props.seller.full_name}
                  </a>
                </Link>
              </td>
              <td>
                {Math.abs(Number(new Date(props.expires_at)) - Date.now()) /
                  (60 * 60 * 1000)}{" "}
                Hours
              </td>
              <td>
                {Number(props.amount).toLocaleString("en", {
                  style: "currency",
                  currency: "usd",
                })}{" "}
                {props.listing.currency}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <ListingPreviewList key={props.listing.id} {...props.listing} />
      </div>
    </div>
  );
}
