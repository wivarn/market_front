import Link from "next/link";
import { Listing } from "types/listings";
import ListingBasicInfo from "./basicInfo";
import Image from "next/image";

const ListingPreview = (props: Listing) => {
  return (
    <div className="justify-center">
      <div className="px-3 py-6">
        <Link href={`/listings/${props.id}`}>
          <a>
            <div className="container rounded-lg shadow-md w-72 hover:shadow-xl">
              <Image
                src={props.photos[0]}
                alt={props.title}
                height={800}
                width={600}
              />
              <div className="p-2">
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
