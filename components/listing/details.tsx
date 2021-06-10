import { PrimaryButton, SubmitButton } from "components/buttons";

import Image from "next/image";
import { LargeUserCircleIcon } from "components/icons";
import { Listing } from "types/listings";
import ListingBasicInfo from "./basicInfo";
import { useSession } from "next-auth/client";

const ListingDetails = (props: Listing) => {
  const [session] = useSession();
  const isSeller = session?.accountId == props.accountId;

  return (
    <div className="">
      <div className="container p-4 mx-auto">
        <div className="flex space-x-4">
          <div className="flex-initial">
            <Image
              src={props.photos[0]}
              alt={props.title}
              height={400}
              width={300}
              className="rounded-md"
            />
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
              {isSeller ? (
                <PrimaryButton
                  href={`/listings/${props.id}/edit`}
                  text="Update"
                />
              ) : (
                <SubmitButton text="Add to Cart" disabled={true} />
              )}
            </div>
            <div className="pt-10">
              <LargeUserCircleIcon />
              <span className="float-right">
                <h2>{props.sellerName}</h2>
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
          <h3 className="mt-4">Recent Seller Reviews</h3>
          <p>review 1</p>
          <p>review 2</p>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
