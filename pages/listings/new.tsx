import ListingForm, { ListingFormDefaultProps } from "components/forms/listing";

import { NextSeo } from "next-seo";

export default function NewListing(): JSX.Element {
  return (
    <>
      <NextSeo title="Create Listing" />
      <ListingForm {...ListingFormDefaultProps} />
    </>
  );
}
