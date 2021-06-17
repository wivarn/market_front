import { BasicListing } from "types/listings";

const ListingDetailInfo = (props: BasicListing) => {
  return (
    <div>
      <label className="font-medium text-accent-darker">{props.title}</label>
      <div>
        <span className="text-accent-darker">
          {Number(props.price).toLocaleString("en", {
            style: "currency",
            currency: "usd",
          })}{" "}
        </span>
        <span className="text-sm text-accent-dark">{props.currency}</span>
      </div>
      <div className="text-xs text-accent-dark">
        +
        {Number(props.domestic_shipping).toLocaleString("en", {
          style: "currency",
          currency: "usd",
        })}{" "}
        Shipping
      </div>
      <div className="font-bold uppercase text-success">{props.condition}</div>
    </div>
  );
};

export default ListingDetailInfo;
