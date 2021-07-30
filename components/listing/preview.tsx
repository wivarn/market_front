import Image from "next/image";
import Link from "next/link";
import { Listing } from "types/listings";
import ListingBasicInfo from "./basicInfo";

const ListingPreview = (props: Listing): JSX.Element => {
  const href =
    props.aasm_state === "active"
      ? `/listings/${props.id}`
      : `/listings/${props.id}/edit`;
  return (
    <div className="mt-4">
      <div>
        <Link href={href}>
          <a>
            <div className="flex flex-wrap bg-white rounded-md shadow-md w-80 hover:shadow-xl">
              <div className="container relative w-80 h-80">
                {props.photos.length ? (
                  <Image
                    src={props.photos[0]}
                    alt={props.title}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADcSURBVHgBNY/PTgIxEMZ/065yUQ96QLyQoI/pE/kqxoMXjImaiCaCchDNamC3Hb4u7LSTtDPfnxk7vL5xDMwhK01v1ylhblR8f3bfvPgiLZb46hcmE+LVJdXwVIDVkvT0TH6dUbicj6CtSQ/3pEcp5Jcp+e5WvbTTPxnA7F+SGWIQ4H0qxryY6LbwpowChSCSU5lv1FiXkZRSqT86KzsbEYZjgjfNjl2aXeh9dEy8GMOmpvK/H8LBgNys6cMswlxD59TpusnPy1A9IERCjF0tsHe3skEfnrVUq7qzBVw1YRwIWDLVAAAAAElFTkSuQmCC"
                    className="rounded-t-md"
                  />
                ) : null}
              </div>
              <div className="w-full px-2 py-1">
                <ListingBasicInfo
                  title={props.title}
                  price={props.price}
                  currency={props.currency}
                  domestic_shipping={props.domestic_shipping}
                  international_shipping={props.international_shipping}
                  grading_company={props.grading_company}
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
