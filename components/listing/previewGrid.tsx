import { ChevronLeftIconSm, ChevronRightIconSm } from "components/icons";

import { Ilisting } from "types/listings";
import { ListingPreviewTile } from "components/listing/preview";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

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
  const router = useRouter();

  function renderPagination() {
    if (totalPages === undefined || initialPage === undefined) return null;

    return (
      <ReactPaginate
        initialPage={initialPage}
        pageCount={totalPages}
        previousLabel={<ChevronLeftIconSm />}
        previousClassName=" bg-primary text-accent-lightest rounded-full"
        nextLabel={<ChevronRightIconSm />}
        nextClassName=" bg-primary text-accent-lightest rounded-full"
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        containerClassName="items-center flex font-semibold flex-row lg:space-x-8 space-x-4 w-max mx-auto justify-center py-2"
        activeClassName="text-primary border-b-2 border-primary font-bold"
        onPageChange={({ selected }) => {
          if (router.query.page != undefined || selected) {
            router.push({
              pathname: router.pathname,
              query: { ...router.query, page: selected },
            });
          }
        }}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-2 mb-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {listings.map((listing: Ilisting) => {
          return <ListingPreviewTile key={listing.id} {...listing} />;
        })}
      </div>
      {renderPagination()}
    </>
  );
};
//FIXME: Pagination doesn't work on mobile
export default ListingPreviewGrid;
