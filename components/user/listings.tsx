import Link from "next/link";
import { Listing } from "types/listings";
import ListingPreviewGrid from "components/listing/previewGrid";
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
      <h2>
        Listings <Link href={`/users/${id}/listings`}>View All</Link>
      </h2>
      <ListingPreviewGrid listings={props.listings} />
    </div>
  );
};

export const UserListings = (props: ListingProps): JSX.Element => {
  return (
    <div>
      <h2>Listings</h2>
      <SearchSort />
      <ListingPreviewGrid
        listings={props.listings}
        initialPage={props.initialPage}
        totalPages={props.totalPages}
      />
    </div>
  );
};
