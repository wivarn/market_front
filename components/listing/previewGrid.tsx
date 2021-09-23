import { Ilisting } from "types/listings";
import { ListingPreviewTile } from "components/listing/preview";
import { Pagination } from "components/pagination";

interface IProps {
  listings: Ilisting[];
  totalPages?: number;
  initialPage?: number;
}

const ListingPreviewGrid = ({
  listings,
  totalPages,
  initialPage,
}: IProps): JSX.Element => {
  return (
    <>
      <div className="grid grid-cols-1 gap-2 mb-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {listings.map((listing: Ilisting) => {
          return <ListingPreviewTile key={listing.id} {...listing} />;
        })}
      </div>
      <Pagination initialPage={initialPage} totalPages={totalPages} />
    </>
  );
};
//FIXME: Pagination doesn't work on mobile
export default ListingPreviewGrid;
