import ListingForm from "components/forms/listing";
import { NextSeo } from "next-seo";

export default function NewListing() {
  return (
    <>
      <NextSeo title="Create Listing" />
      <ListingForm />
    </>
  );
}
