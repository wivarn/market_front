import ListingForm, { ListingFormDefaultProps } from "components/forms/listing";

import { NextSeo } from "next-seo";
import { redirectUnauthenticated } from "ultils/authentication";

export default function NewListing(): JSX.Element {
  redirectUnauthenticated();
  return (
    <>
      <NextSeo title="Create Listing" />
      <ListingForm {...ListingFormDefaultProps} />
    </>
  );
}
