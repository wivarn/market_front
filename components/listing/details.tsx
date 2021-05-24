import { Listing } from "types/listings";
import ListingBasicInfo from "./basicInfo";

const ListingDetails = (props: Listing) => {
  return (
    <div className="flex">
      <div className="border border-blue-500 w-96 h-96">
        image url: {props.photos[0]}
      </div>
      <ListingBasicInfo
        title={props.title}
        price={props.price}
        currency={props.currency}
        domestic_shipping={props.domestic_shipping}
        condition={props.condition}
      />
    </div>
  );
};

export default ListingDetails;
