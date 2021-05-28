import { BasicListing } from "types/listings";

const ListingBasicInfo = (props: BasicListing) => {
  return (
    <div>
      <h3 className="text-accent-dark">{props.title}</h3>
      <div>
        <span className="text-2xl text-accent-dark">${props.price} </span>
        <span className="text-xs text-accent-dark">{props.currency}</span>
      </div>
      <div className="text-accent">+${props.domestic_shipping} Shipping</div>
      <div className="text-success uppercase font-bold">{props.condition}</div>
    </div>
  );
};

export default ListingBasicInfo;
