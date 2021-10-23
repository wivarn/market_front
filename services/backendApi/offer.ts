import { AxiosResponse } from "axios";
import { base } from "./base";

export const OfferApi = (
  accessToken?: string
): {
  create: (
    listingId: string,
    amount: string | number
  ) => Promise<AxiosResponse<any>>;
  createCounter: (
    id: string,
    amount: string | number
  ) => Promise<AxiosResponse<any>>;
} => {
  const create = async (listingId: string, amount: string | number) => {
    return base.post(
      "offers",
      {
        listing_id: listingId,
        amount: amount,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const createCounter = async (id: string, amount: string | number) => {
    return base.post(
      `offers/${id}/counter_offer`,
      {
        amount: amount,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  return { create, createCounter };
};
