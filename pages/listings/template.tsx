import ListingTemplateForm from "components/forms/listing/template";
import { NextSeo } from "next-seo";
import useSWR from "swr";
import { useSession } from "next-auth/client";

export default function NewListing(): JSX.Element {
  const [session] = useSession();

  function getListingTemplate() {
    const { data, error } = useSWR(
      session ? ["account/listing_template", session.accessToken] : null
    );

    return {
      response: data,
      loadingTemplate: !error && !data,
      isError: error,
    };
  }

  const { response, loadingTemplate, isError } = getListingTemplate();

  if (loadingTemplate) return <div>Spinner</div>;
  if (isError) return <div>Error</div>;

  const template = response.data;

  return (
    <>
      <NextSeo title="Update Listing Template" />
      <ListingTemplateForm
        category={template.category}
        subcategory={template.subcategory}
        title={template.title}
        description={template.description}
        grading_company={template.grading_company}
        condition={template.condition}
        price={template.price}
        domestic_shipping={template.domestic_shipping}
        international_shipping={template.international_shipping}
      />
    </>
  );
}
