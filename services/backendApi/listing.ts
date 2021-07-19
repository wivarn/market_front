import { AxiosResponse } from "axios";
import { Listing } from "../../types/listings";
import { base } from "./base";

export const ListingApi = (
  accessToken?: string
): {
  create: (listing: Listing) => Promise<AxiosResponse<any>>;
  bulkCreate: (listings: Listing[]) => Promise<AxiosResponse<any>>;
  update: ({ id, ...listing }: Listing) => Promise<AxiosResponse<any>>;
  updateState: (
    id: string,
    state_transition: string
  ) => Promise<AxiosResponse<any>>;
  destroy: (id: string) => Promise<AxiosResponse<any>>;
} => {
  const create = async (listing: Listing) => {
    return base.post(
      "listings",
      {
        category: listing.category,
        subcategory: listing.subcategory,
        photos: listing.photos,
        title: listing.title,
        grading_company: listing.grading_company,
        condition: listing.condition,
        description: listing.description,
        price: listing.price,
        domestic_shipping: listing.domestic_shipping,
        international_shipping: listing.international_shipping,
        state_transition: listing.state_transition,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const bulkCreate = async (listings: Listing[]) => {
    return base.post(
      "listings/bulk_create",
      { listings: listings },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const update = async ({ id, ...listing }: Listing) => {
    return base.post(
      `listings/${id}`,
      {
        category: listing.category,
        subcategory: listing.subcategory,
        photos: listing.photos,
        title: listing.title,
        grading_company: listing.grading_company,
        condition: listing.condition,
        description: listing.description,
        price: listing.price,
        domestic_shipping: listing.domestic_shipping,
        international_shipping: listing.international_shipping,
        state_transition: listing.state_transition,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const updateState = async (id: string, state_transition: string) => {
    return base.post(
      `listings/${id}`,
      {
        state_transition: state_transition,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const destroy = async (id: string) => {
    return base.delete(`listings/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  return { create, bulkCreate, update, updateState, destroy };
};
