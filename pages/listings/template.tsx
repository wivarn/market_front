import ListingTemplateForm from "components/forms/listing/template";
import { NextSeo } from "next-seo";

export default function NewListing(): JSX.Element {
  return (
    <>
      <NextSeo title="Update Listing Template" />
      <ListingTemplateForm />
    </>
  );
}
