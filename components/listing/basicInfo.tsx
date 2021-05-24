import { BasicListing } from "types/listings";

const ListingBasicInfo = (props: BasicListing) => {
  return (
    <div>
      <div className="text-base">{props.title}</div>
      <div>
        <span className="text-4xl text-blue-500">${props.price} </span>
        <span className="text-xs italic text-gray-500">{props.currency}</span>
      </div>
      <div className="text-gray-500">+${props.domestic_shipping} Shipping</div>
      <div className="text-green-600 uppercase font-bold">
        {props.condition}
      </div>
    </div>
  );
};

export default ListingBasicInfo;
