import { AxiosResponse } from "axios";
import { Listing } from "../../types/listings";
import { base } from "./base";

export const ListingApi = (
  accessToken?: string
): {
  create: (formData: FormData) => Promise<AxiosResponse<any>>;
  bulkCreate: (listings: Listing[]) => Promise<AxiosResponse<any>>;
  update: (id: string, formData: FormData) => Promise<AxiosResponse<any>>;
  updateState: (
    id: string,
    state_transition: string
  ) => Promise<AxiosResponse<any>>;
  destroy: (id: string) => Promise<AxiosResponse<any>>;
} => {
  const create = async (formData: FormData) => {
    return base.post("listings", formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
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

  const update = async (id: string, formData: FormData) => {
    return base.post(`listings/${id}`, formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
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
