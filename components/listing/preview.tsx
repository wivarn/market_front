import { ConditionPill } from "./condition";
import { Ilisting } from "types/listings";
import Image from "next/image";
import Link from "next/link";

// card shaped preview
export const ListingPreviewTile = (props: Ilisting): JSX.Element => {
  const href =
    props.aasm_state === "draft" || props.aasm_state === "removed"
      ? `/listings/${props.id}/edit`
      : `/listings/${props.id}`;
  const renderOffer = () => {
    if (!props.accept_offers) return null;

    return (
      <div className="pr-1 text-xs leading-none text-accent-darker">
        or Best Offer{" "}
      </div>
    );
  };
  const renderShipping = () => {
    if (props.shipping == null) {
      return (
        <div className="text-xs font-semibold leading-none text-error">
          {"Doesn't ship to your location"}
        </div>
      );
    } else if (props.shipping == 0) {
      return (
        <div className="text-xs font-semibold leading-none text-success">
          + Free Shipping
        </div>
      );
    }
    return (
      <div className="text-xs leading-none text-accent-dark">
        +
        {Number(props.shipping).toLocaleString("en", {
          style: "currency",
          currency: "usd",
        })}{" "}
        Shipping
      </div>
    );
  };
  return (
    <div className="mt-4">
      <div>
        <Link href={href}>
          <a>
            <div className="flex flex-wrap bg-white border rounded-md w-72 group border-accent-light hover:shadow-md">
              {props.photos.length ? (
                <Image
                  src={props.photos[0].url}
                  alt={props.title}
                  width="288"
                  height="288"
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL="/assets/image-loader.svg"
                  className="rounded-t-md"
                />
              ) : (
                <Image
                  src="/no-image.png"
                  alt="No Image"
                  width="320"
                  height="320"
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL="/assets/image-loader.svg"
                  className="rounded-t-md"
                />
              )}
              <div className="w-full px-2">
                <div className="mt-1 mb-1">
                  <div className="h-10">
                    <p className="text-sm truncate group-hover:text-primary group-hover:font-semibold text-accent-darker">
                      {props.title}
                    </p>
                  </div>
                  <div className="relative">
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
                        category={props.category}
                      />
                    </span>
                  </div>
                  <div className="flex">
                    {renderOffer()}
                    {renderShipping()}
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
export const ListingPreviewList = (props: Ilisting): JSX.Element => {
  const renderPrice = () => {
    return (
      <span className="font-semibold text-accent-darker">
        <span className={props.accepted_offer ? "line-through" : ""}>
          {Number(props.price).toLocaleString("en", {
            style: "currency",
            currency: "usd",
          })}{" "}
          <span className="text-xs text-accent-dark">{props.currency}</span>
        </span>
        {props.accepted_offer ? (
          <span>
            {" "}
            {Number(props.accepted_offer.amount).toLocaleString("en", {
              style: "currency",
              currency: "usd",
            })}{" "}
            <span className="text-xs text-accent-dark">{props.currency}</span>
          </span>
        ) : null}
      </span>
    );
  };

  const renderShipping = () => {
    if (props.shipping == null) {
      return (
        <div className="text-xs font-semibold leading-none text-error">
          {"Doesn't ship to your location"}
        </div>
      );
    } else if (props.shipping == 0) {
      return (
        <div className="text-xs font-semibold leading-none text-success">
          + Free Shipping
        </div>
      );
    }
    return (
      <div className="text-xs leading-none text-accent-dark">
        +
        {Number(props.shipping).toLocaleString("en", {
          style: "currency",
          currency: "usd",
        })}{" "}
        Shipping
      </div>
    );
  };

  return (
    <div key={props.id} className="mx-4 my-4 space-y-2">
      <Link href={`/listings/${props.id}`}>
        <a className="flex border rounded-md hover:shadow-md group">
          <Image
            src={props.photos[0].url}
            alt={props.title}
            width="96"
            height="96"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="/assets/image-loader.svg"
            className="rounded-l-md"
          />
          <div className="relative w-full p-2 rounded-r-md">
            <p className="mr-8 line-clamp-1 group-hover:text-primary group-hover:font-semibold">
              {props.title}
            </p>

            <div className="flex justify-end mt-4">
              <div className="grid grid-cols-1">
                {renderPrice()}
                {renderShipping()}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
