import { Listing } from "types/listings";
import ListingPreview from "components/listing/preview";

interface Listings {
  listings: Listing[];
}

const ListingPreviewGrid = (props: Listings) => {
  return (
    <div className="grid grid-cols-4 gap-4 justify-items-center">
      {props.listings.map((listing: Listing) => {
        return (
          <ListingPreview
            key={listing.id}
            photos={listing.photos}
            title={listing.title}
            price={listing.price}
            currency={listing.currency}
            domestic_shipping={listing.domestic_shipping}
            condition={listing.condition}
          />
        );
      })}
    </div>
  );
};

export default ListingPreviewGrid;
