import { BasicListing } from "types/listings";

const ListingBasicInfo = (props: BasicListing) => {
  return (
    <div>
      <h3 className="uppercase text-accent-darkest">{props.title}</h3>
      <div>
        <span className="text-2xl text-accent-darker">${props.price} </span>
        <span className="text-xs text-accent-dark">{props.currency}</span>
      </div>
      <div className="text-accent-dark">+${props.domestic_shipping} Shipping</div>
      <div className="font-bold uppercase text-success">{props.condition}</div>
    </div>
  );
};

export default ListingBasicInfo;
