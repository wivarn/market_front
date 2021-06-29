import { BasicListing } from "types/listings";
import { ConditionPill } from "./condition";

const ListingBasicInfo = (props: BasicListing): JSX.Element => {
  return (
    <div className="mt-1 mb-1">
      <div className="border-b h-14">
        <p className="h-full font-semibold truncate text-accent-darker">
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
        <span className="text-xs text-accent-dark">{props.currency}</span>
        <span className="absolute inset-y-0 right-0">
          <ConditionPill
            grading_company={props.grading_company}
            condition={props.condition}
          />
        </span>
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
