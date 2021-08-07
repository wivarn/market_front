import { AxiosResponse } from "axios";
import { IListingTemplate } from "../../types/listings";
import { base } from "./base";

export const ListingTemplateApi = (
  accessToken?: string
): {
  update: (listing: IListingTemplate) => Promise<AxiosResponse<any>>;
} => {
  const update = async (listing: IListingTemplate) => {
    return base.post(
      `account/listing_template`,
      {
        category: listing.category,
        subcategory: listing.subcategory,
        title: listing.title,
        grading_company: listing.grading_company,
        condition: listing.condition,
        description: listing.description,
        price: listing.price,
        domestic_shipping: listing.domestic_shipping,
        international_shipping: listing.international_shipping,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  return { update };
};
