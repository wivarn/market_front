import { BasicListing } from "types/listings";

const ListingBasicInfo = (props: BasicListing) => {
  return (
    <div className="mt-1 mb-1">
      <div className="border-b h-14">
        <label className="font-medium text-accent-darker">{props.title}</label>
      </div>
      <div className="mt-1">
        <span className="font-semibold text-accent-darker">
          {Number(props.price).toLocaleString("en", {
            style: "currency",
            currency: "usd",
          })}{" "}
        </span>
        <span className="text-xs text-accent-dark">{props.currency}</span>
        <div className="float-right font-bold float text-success">
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
