import { Listing } from "types/listings";
import ListingPreview from "components/listing/preview";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

interface Listings {
  listings: Listing[];
  totalPages: number;
  initialPage?: number;
}

const ListingPreviewGrid = ({
  listings,
  totalPages,
  initialPage,
}: Listings): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-1 gap-2 mb-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {listings.map((listing: Listing) => {
          return (
            <ListingPreview
              key={listing.id}
              id={listing.id}
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
      <ReactPaginate
        initialPage={initialPage}
        pageCount={totalPages}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        containerClassName="flex flex-row space-x-12 w-max mx-auto justify-center"
        activeClassName="underline font-bold"
        onPageChange={({ selected }) => {
          router.push({
            pathname: router.pathname,
            query: { ...router.query, ...{ page: selected } },
          });
        }}
      />
    </>
  );
};

export default ListingPreviewGrid;
