import { SecondaryButton, SubmitButton } from "components/buttons";

import Image from "next/image";
import { LgUserCircleIcon } from "components/icons";
import { Listing } from "types/listings";
import { useSession } from "next-auth/client";

const ListingDetails = (props: Listing): JSX.Element => {
  const [session] = useSession();
  const isSeller = session?.accountId == props.accountId;

  return (
    <div className="">
      <div className="container relative p-4 mx-auto">
        <div className="absolute right-0">
          <SecondaryButton
            href={`/listings/${props.id}/edit`}
            text="Update Listing"
            hidden={!isSeller}
          />
        </div>
        <h3 className="flex-initial p-2 mb-4 text-center border-b border-accent">
          {props.title}
        </h3>
        <div className="lg:flex lg:flex-inital">
          <Image
            src={props.photos[0]}
            alt={props.title}
            height={800}
            width={600}
            className="rounded-md"
          />

          <div className="lg:flex-initial lg:pl-8">
            <div>
              <SubmitButton text="Add to Cart" disabled={true} />
            </div>
            <div className="pt-10">
              <LgUserCircleIcon />
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
