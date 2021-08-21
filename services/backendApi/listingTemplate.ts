import { AxiosResponse } from "axios";
import { IListingTemplate } from "../../types/listings";
import { base } from "./base";

export const ListingTemplateApi = (
  accessToken?: string
): {
  update: (template: IListingTemplate) => Promise<AxiosResponse<any>>;
} => {
  const update = async (template: IListingTemplate) => {
    return base.post(
      `account/listing_template`,
      { ...template },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  return { update };
};
