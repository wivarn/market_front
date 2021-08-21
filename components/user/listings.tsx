import { Ilisting } from "types/listings";
import Link from "next/link";
import ListingPreviewGrid from "components/listing/previewGrid";
import SearchFilter from "components/forms/listing/searchFilter";
import SearchSort from "components/forms/listing/searchSort";
import { useRouter } from "next/router";

interface PreviewProps {
  listings: Ilisting[];
}

interface ListingProps extends PreviewProps {
  totalPages: number;
  initialPage: number;
}

export const UserRecentListings = (props: PreviewProps): JSX.Element => {
  const { id } = useRouter().query;
  return (
    <div>
      <h3 className="mb-4 text-center">
        Recent Listings{" "}
        <Link href={`/users/${id}/listings`}>
          <a className="text-base underline text-info">View All</a>
        </Link>
      </h3>
      <ListingPreviewGrid listings={props.listings} />
    </div>
  );
};

export const UserListings = (props: ListingProps): JSX.Element => {
  return (
    <div>
      <div className="grid items-center grid-cols-4 mb-4 space-between justify-items-center">
        <SearchFilter />
        <h3 className="col-span-2 text-center">Listings</h3>
        <SearchSort />
      </div>
      <ListingPreviewGrid
        listings={props.listings}
        initialPage={props.initialPage}
        totalPages={props.totalPages}
      />
    </div>
  );
};
