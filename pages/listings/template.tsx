import ListingTemplateForm from "components/forms/listing/template";
import { NextSeo } from "next-seo";
import { redirectUnauthenticated } from "ultils/authentication";

export default function NewListing(): JSX.Element {
  redirectUnauthenticated();
  return (
    <>
      <NextSeo title="Update Listing Template" />
      <ListingTemplateForm />
    </>
  );
}
