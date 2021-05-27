import Link from "next/link";
import { Listing } from "types/listings";
import ListingBasicInfo from "./basicInfo";

const ListingPreview = (props: Listing) => {
  return (
    <Link href={`/listings/${props.id}`}>
      <a>
        <div className="border border-primary w-52">
          <div className="border border-primary w-full h-56">
            image url: {props.photos[0]}
          </div>
          <ListingBasicInfo
            title={props.title}
            price={props.price}
            currency={props.currency}
            domestic_shipping={props.domestic_shipping}
            condition={props.condition}
          />
        </div>
      </a>
    </Link>
  );
};

export default ListingPreview;
