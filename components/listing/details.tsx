import { SecondaryButtonFull, SubmitButtonFull } from "components/buttons";

import { ImageSlider } from "components/listing/imageSlider";
import { InfoCard } from "./infoCard";
import { LgUserCircleIcon } from "components/icons";
import { Listing } from "types/listings";
import { useSession } from "next-auth/client";

const ListingDetails = (props: Listing): JSX.Element => {
  const [session] = useSession();
  const isSeller = session?.accountId == props.accountId;

  return (
    <div className="container relative p-4 mx-auto">
      <div className="">
        <h3 className="flex-initial p-2 my-4 text-center border-b border-accent">
          {props.title}
        </h3>
        <div className="md:grid md:grid-auto-cols">
          <div>
            <ImageSlider src={props.photos[0]} alt={props.title} />
          </div>
          <InfoCard>
            <h4 className="pb-2 mb-4 text-center border-b ">
              Item Information
            </h4>
            <span className="text-2xl font-semibold text-accent-darker">
              {Number(props.price).toLocaleString("en", {
                style: "currency",
                currency: "usd",
              })}{" "}
            </span>
            <span className="text-md text-accent-dark">{props.currency}</span>
            <div className="text-sm leading-none text-accent-dark">
              +
              {Number(props.domestic_shipping).toLocaleString("en", {
                style: "currency",
                currency: "usd",
              })}{" "}
              Shipping
            </div>
            <div className="my-2 font-medium">
              Condition: {props.grading_company} {props.condition}
            </div>
            <div>
              <SubmitButtonFull
                text="Add to Cart"
                disabled={isSeller}
                hidden={isSeller}
              />
              <SecondaryButtonFull
                href={`/listings/${props.id}/edit`}
                text="Update Listing"
                hidden={!isSeller}
              />
              <div className="my-4 border"></div>
              <LgUserCircleIcon />
              <span className="">
                <h3>{props.sellerName}</h3>
                <div className="text-sm text-accent">Location</div>
                <div className="text-sm text-success">User Rating</div>
              </span>
              <div className="my-4 border"></div>
              <div className="my-2">{props.description}</div>
            </div>
          </InfoCard>
        </div>
      </div>

      <InfoCard>
        <h3 className="pb-2 text-center border-b">Recent Seller Reviews</h3>
        <div className="pt-4">
          <p>review 1</p>
          <p>review 2</p>
        </div>
      </InfoCard>
    </div>
  );
};

export default ListingDetails;
