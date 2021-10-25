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
  accept: (id: string) => Promise<AxiosResponse<any>>;
  reject: (id: string) => Promise<AxiosResponse<any>>;
  cancel: (id: string) => Promise<AxiosResponse<any>>;
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
      `offers/${id}/create_counter`,
      {
        amount: amount,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const accept = async (id: string) => {
    return base.post(
      `offers/${id}/accept`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const reject = async (id: string) => {
    return base.post(
      `offers/${id}/reject`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const cancel = async (id: string) => {
    return base.post(
      `offers/${id}/cancel`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  return { create, createCounter, accept, reject, cancel };
};
