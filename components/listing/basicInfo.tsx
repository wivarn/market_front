import { BasicListing } from "types/listings";

const ListingBasicInfo = (props: BasicListing) => {
  return (
    <div>
      <h3 className="uppercase text-accent-darkest">{props.title}</h3>
      <div>
        <span className="text-2xl text-accent-darker">
          {Number(props.price).toLocaleString("en", {
            style: "currency",
            currency: "usd",
          })}{" "}
        </span>
        <span className="text-xs text-accent-dark">{props.currency}</span>
      </div>
      <div className="text-accent-dark">
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

export default ListingBasicInfo;
