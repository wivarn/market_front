import { SmChevronLeftIcon, SmChevronRightIcon } from "components/icons";

import { IListing } from "types/listings";
import { ListingPreviewTile } from "components/listing/preview";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

interface Listings {
  listings: IListing[];
  totalPages?: number;
  initialPage?: number;
}

const ListingPreviewGrid = ({
  listings,
  totalPages,
  initialPage,
}: Listings): JSX.Element => {
  const router = useRouter();

  function renderPagination() {
    if (totalPages === undefined || initialPage === undefined) return null;

    return (
      <ReactPaginate
        initialPage={initialPage}
        pageCount={totalPages}
        previousLabel={<SmChevronLeftIcon />}
        previousClassName=" bg-primary text-accent-lightest rounded-full"
        nextLabel={<SmChevronRightIcon />}
        nextClassName=" bg-primary text-accent-lightest rounded-full"
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        containerClassName="items-center flex font-semibold flex-row lg:space-x-8 space-x-4 w-max mx-auto justify-center py-2"
        activeClassName="text-primary border-b-2 border-primary font-bold"
        onPageChange={({ selected }) => {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, ...{ page: selected } },
          });
        }}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-2 mb-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {listings.map((listing: IListing) => {
          return (
            <ListingPreviewTile
              key={listing.id}
              id={listing.id}
              aasm_state={listing.aasm_state}
              photos={listing.photos}
              title={listing.title}
              price={listing.price}
              currency={listing.currency}
              domestic_shipping={listing.domestic_shipping}
              international_shipping={listing.international_shipping}
              grading_company={listing.grading_company}
              condition={listing.condition}
            />
          );
        })}
      </div>
      {renderPagination()}
    </>
  );
};
//FIXME: Pagination doesn't work on mobile
export default ListingPreviewGrid;
