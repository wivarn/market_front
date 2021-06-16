import Link from "next/link";
import { Listing } from "types/listings";
import ListingBasicInfo from "./basicInfo";

const ListingPreview = (props: Listing) => {
  return (
    <div className="mt-4">
      <div>
        <Link href={`/listings/${props.id}`}>
          <a>
            <div className="flex flex-wrap bg-white rounded-md shadow-md w-80 hover:shadow-xl">
              <div className="image">
                <img
                  src={props.photos[0]}
                  alt={props.title}
                  className="rounded-t-md"
                />
                </div>
              <div className="px-2 py-1 w-96">
                <ListingBasicInfo
                  title={props.title}
                  price={props.price}
                  currency={props.currency}
                  domestic_shipping={props.domestic_shipping}
                  condition={props.condition}
                />
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ListingPreview;