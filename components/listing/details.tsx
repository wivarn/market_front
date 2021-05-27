import { LargeUserCircleIcon } from "components/icons";
import { Listing } from "types/listings";
import ListingBasicInfo from "./basicInfo";
import { SubmitButton } from "components/buttons";

const ListingDetails = (props: Listing) => {
  return (
    <div>
      <div className="flex space-x-4">
        <div className="flex-initial bg-primary w-96 h-96">
          image url: {props.photos[0]}
        </div>
        <div className="flex-initial pl-10">
          <div className="pt-10">
            <ListingBasicInfo
              title={props.title}
              price={props.price}
              currency={props.currency}
              domestic_shipping={props.domestic_shipping}
              condition={props.condition}
            />
            <SubmitButton text="Add to Cart" disabled={true} />
          </div>
          <div className="pt-10">
            <LargeUserCircleIcon />
            <span className="float-right">
              <div className="text-4xl font-bold">{props.sellerName}</div>
              <div className="text-sm text-accent">Location</div>
              <div className="text-sm text-success">User Rating</div>
            </span>
          </div>
        </div>
      </div>
      <div>
        <p>{props.description}</p>
      </div>
      <div>
        <h1 className="text-xl font-bold">Recent Seller Reviews</h1>
        <p>review 1</p>
        <p>review 2</p>
      </div>
    </div>
  );
};

export default ListingDetails;
