import { IOffer } from "types/offer";
import Link from "next/dist/client/link";
import { ListingPreviewList } from "components/listing/preview";

export function Offer(props: IOffer): JSX.Element {
  return (
    <div className="max-w-4xl mx-auto mt-4 rounded-md shadow-md">
      <div>
        <div className="relative flex items-center px-4 py-2 space-x-2 text-white bg-info-darker rounded-t-md">
          Offer Sent
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
              <td>stub</td>
              <td>{props.amount}</td>
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
