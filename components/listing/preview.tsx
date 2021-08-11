import { IListingPreview, IListingPreviewWithCondition } from "types/listings";

import { ConditionPill } from "./condition";
import Image from "next/image";
import Link from "next/link";

// card shaped preview
export const ListingPreviewTile = (
  props: IListingPreviewWithCondition
): JSX.Element => {
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
                    src={props.photos[0].url}
                    alt={props.title}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="/assets/image-loader.svg"
                    className="rounded-t-md"
                  />
                ) : null}
              </div>
              <div className="w-full px-2 py-1">
                <div className="mt-1 mb-1">
                  <div className="border-b h-14">
                    <p className="font-semibold line-clamp-2 text-accent-darker">
                      {props.title}
                    </p>
                  </div>
                  <div className="relative mt-1">
                    <span className="font-semibold text-accent-darker">
                      {Number(props.price).toLocaleString("en", {
                        style: "currency",
                        currency: "usd",
                      })}{" "}
                    </span>
                    <span className="text-xs text-accent-dark">
                      {props.currency}
                    </span>
                    <span className="absolute inset-y-0 right-0">
                      <ConditionPill
                        grading_company={props.grading_company}
                        condition={props.condition}
                      />
                    </span>
                  </div>
                  <div className="text-xs leading-none text-accent-dark">
                    +
                    {Number(props.shipping).toLocaleString("en", {
                      style: "currency",
                      currency: "usd",
                    })}{" "}
                    Shipping
                  </div>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

// banner shaped preview
export const ListingPreviewList = (props: IListingPreview): JSX.Element => {
  console.log(props);
  return (
    <div key={props.id} className="mx-4 my-4 space-y-2">
      <Link href={`/listings/${props.id}`}>
        <a className="flex hover:shadow-md">
          <div className="container relative w-24 h-24">
            <Image
              src={props.photos[0].url}
              alt={props.title}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL="/assets/image-loader.svg"
              className="rounded-l-md"
            />
          </div>
          <div className="w-full p-2 border rounded-r-md">
            <p className="line-clamp-1">{props.title}</p>

            <div>
              <span className="font-semibold text-accent-darker">
                {Number(props.price).toLocaleString("en", {
                  style: "currency",
                  currency: "usd",
                })}{" "}
              </span>
              <span className="text-xs text-accent-dark">{props.currency}</span>
              <div className="text-xs leading-none text-accent-dark">
                +
                {Number(props.shipping).toLocaleString("en", {
                  style: "currency",
                  currency: "usd",
                })}{" "}
                Shipping
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
