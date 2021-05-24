import { Listing } from "types/listings";

const ListingPreview = (props: Listing) => {
  return (
    <div className="border border-blue-500 w-52">
      <div className="border border-blue-500 w-full h-56">
        image url: {props.photos[0]}
      </div>
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

export default ListingPreview;
