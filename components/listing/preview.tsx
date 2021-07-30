import { ICartListing, Listing } from "types/listings";

import Image from "next/image";
import Link from "next/link";
import ListingBasicInfo from "./basicInfo";

export const ListingPreviewTile = (props: Listing): JSX.Element => {
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
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFlSURBVHgBFY/JbtNQAEWP/Z7t4LR26jgDEdCyoBSJYc2uAjYg2MEn8Et8CkhILFgwFJDYVJTSCAmJtE4ztU0d+8XDq3uluzvS0TGev3qtm57g2mqKVJpzNSTLl2RLRVL9x/6SpUowXbfO/Q3By2ePeHiloGdKtlSXYDZkw5hzOa1LzBurOb40sT6/Yavo83S7zePee0b+Jp5T0PEsGjWBNIVEGyXWdRv/xQN+fmgTdu7yJN/lUHnUbAfqJbIbNlnzc9JBSOpDSx1Qv9mgkQQcT01qliBLK7DduoowIr4fRtyzTvg9gNkfl0anWQVFpIkmXsRIzwtwSsW7PRjsrfB1HrF9u8vOpz7rtzTHozOysoqZzCYkWYEQ0F5pUueUwPfZXO/h2hLDNMgLjRyOJ8zL/2TTIwZhizTPGP3bZxodEN4RlBocx8bY/bKjv318Sxz/xagUiZpjOy6LONHD8YJf/THBWsAFu1mYYHGmVmwAAAAASUVORK5CYII="
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

export const ListingPreviewList = (props: ICartListing): JSX.Element => {
  return (
    <div key={props.id} className="mx-4 my-4 space-y-2">
      <Link href={`/listings/${props.id}`}>
        <a className="flex hover:shadow-md">
          <div className="container relative w-24 h-24">
            <Image
              src={props.photos[0]}
              alt={props.title}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFlSURBVHgBFY/JbtNQAEWP/Z7t4LR26jgDEdCyoBSJYc2uAjYg2MEn8Et8CkhILFgwFJDYVJTSCAmJtE4ztU0d+8XDq3uluzvS0TGev3qtm57g2mqKVJpzNSTLl2RLRVL9x/6SpUowXbfO/Q3By2ePeHiloGdKtlSXYDZkw5hzOa1LzBurOb40sT6/Yavo83S7zePee0b+Jp5T0PEsGjWBNIVEGyXWdRv/xQN+fmgTdu7yJN/lUHnUbAfqJbIbNlnzc9JBSOpDSx1Qv9mgkQQcT01qliBLK7DduoowIr4fRtyzTvg9gNkfl0anWQVFpIkmXsRIzwtwSsW7PRjsrfB1HrF9u8vOpz7rtzTHozOysoqZzCYkWYEQ0F5pUueUwPfZXO/h2hLDNMgLjRyOJ8zL/2TTIwZhizTPGP3bZxodEN4RlBocx8bY/bKjv318Sxz/xagUiZpjOy6LONHD8YJf/THBWsAFu1mYYHGmVmwAAAAASUVORK5CYII="
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
                {Number(props.domestic_shipping).toLocaleString("en", {
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
