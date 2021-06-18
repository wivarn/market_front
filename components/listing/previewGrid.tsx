import { Listing } from "types/listings";
import ListingPreview from "components/listing/preview";

interface Listings {
  listings: Listing[];
}

const ListingPreviewGrid = (props: Listings): JSX.Element => {
  return (
    <div className="grid grid-cols-1 gap-2 mb-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
      {props.listings.map((listing: Listing) => {
        return (
          <ListingPreview
            key={listing.id}
            id={listing.id}
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
