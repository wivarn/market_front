import { Listing } from "types/listings";

const ListingDetailInfo = (props: Listing): JSX.Element => {
  return (
    <div className="">
      <h4 className="flex-wraps">{props.title}</h4>
      <div>
        <div className="text-xl font-bold uppercase text-success">
          {props.condition}
        </div>
        <span className="text-xl text-accent-darker">
          {Number(props.price).toLocaleString("en", {
            style: "currency",
            currency: "usd",
          })}{" "}
        </span>
        <span className="text-accent-dark">{props.currency}</span>
      </div>
      <div className="text-xs text-accent-dark">
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

export default ListingDetailInfo;
