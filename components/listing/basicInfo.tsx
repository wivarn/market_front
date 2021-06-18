import { BasicListing } from "types/listings";
import { ProfilePageJsonLd } from "next-seo";

const ListingBasicInfo = (props: BasicListing): JSX.Element => {
  let shortTitle = props.title;
  if (props.title.length > 64)
    shortTitle = props.title.substring(0, 60) + " ...";
  return (
    <div className="mt-1 mb-1">
      <div className="border-b h-14">
        <label className="font-medium text-accent-darker">{shortTitle}</label>
      </div>
      <div className="mt-1">
        <span className="font-semibold text-accent-darker">
          {Number(props.price).toLocaleString("en", {
            style: "currency",
            currency: "usd",
          })}{" "}
        </span>
        <span className="text-xs text-accent-dark">{props.currency}</span>
        <div className="float-right font-bold text-success">
          {props.condition}
        </div>
      </div>
      <div className="text-xs leading-none text-accent-dark">
        +
        {Number(props.domestic_shipping).toLocaleString("en", {
          style: "currency",
          currency: "usd",
        })}{" "}
        Shipping
      </div>
    </div>
  );
};

export default ListingBasicInfo;
