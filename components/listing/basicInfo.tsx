import { BasicListing } from "types/listings";

const ListingBasicInfo = (props: BasicListing) => {
  return (
    <div>
      <div className="text-accent">{props.title}</div>
      <div>
        <span className="text-4xl text-primary">${props.price} </span>
        <span className="text-xs italic text-accent">{props.currency}</span>
      </div>
      <div className="text-accent">+${props.domestic_shipping} Shipping</div>
      <div className="text-success uppercase font-bold">{props.condition}</div>
    </div>
  );
};

export default ListingBasicInfo;
