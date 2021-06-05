import Image from "next/image";
import Link from "next/link";
import { Listing } from "types/listings";
import ListingBasicInfo from "./basicInfo";

const ListingPreview = (props: Listing) => {
  return (
    <div className="justify-center">
      <div className="px-3 py-6">
        <Link href={`/listings/${props.id}`}>
          <a>
            <div className="border rounded-lg border-accent-dark hover:shadow-lg">
                <Image
                  src={props.photos[0]}
                  alt={props.title}
                  height={400}
                  width={300}
                  className="rounded-t-md bg-accent-dark"
                />
              <div className="p-2 border-t border-accent-dark">
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