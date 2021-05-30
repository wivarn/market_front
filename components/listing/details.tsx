import Image from "next/image";
import { LargeUserCircleIcon } from "components/icons";
import { Listing } from "types/listings";
import ListingBasicInfo from "./basicInfo";
import SimpleImageSlider from "react-simple-image-slider";
import { SubmitButton } from "components/buttons";

// Stub photos for slide show
const slidePhotos = [
 {url: "/images/picture-1.jpg"},
 {url: "/images/picture-2.jpg"},
 {url: "/images/picture-3.jpg"},
 {url: "/images/picture-4.jpg"},
 {url: "/images/picture-5.jpg"},
];

// Listing details
const ListingDetails = (props: Listing) => {
  return (
    <div className="">
      <div className="container p-4 mx-auto">
        <div className="flex space-x-4">
          <div className="flex-initial">
            <SimpleImageSlider
              width={450}
              height={600}
              images={slidePhotos}
              showNavs={true}
              showBullets={true}
              navStyle={2}
              navMargin={1}
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
              <SubmitButton text="Add to Cart" disabled={true} />
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
