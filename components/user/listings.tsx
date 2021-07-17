import Link from "next/link";
import { Listing } from "types/listings";
import ListingPreviewGrid from "components/listing/previewGrid";
import SearchFilter from "components/forms/listing/searchFilter";
import SearchSort from "components/forms/listing/searchSort";
import { useRouter } from "next/router";

interface PreviewProps {
  listings: Listing[];
}

interface ListingProps extends PreviewProps {
  totalPages: number;
  initialPage: number;
}

export const UserListingsPreview = (props: PreviewProps): JSX.Element => {
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
      <div className="grid items-center grid-cols-3 space-between justify-items-center">
        <SearchFilter />
        <h3 className="text-center">Listings</h3>
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
