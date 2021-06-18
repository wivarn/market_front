import Image from "next/image";
import Link from "next/link";
import { Listing } from "types/listings";
import ListingBasicInfo from "./basicInfo";

const ListingPreview = (props: Listing): JSX.Element => {
  return (
    <div className="mt-4">
      <div>
        <Link href={`/listings/${props.id}`}>
          <a>
            <div className="flex flex-wrap bg-white rounded-md shadow-md w-80 hover:shadow-xl">
              <div className="container relative w-80 h-80">
                <Image
                  src={props.photos[0]}
                  alt={props.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-md"
                />
              </div>
              <div className="w-full px-2 py-1">
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
