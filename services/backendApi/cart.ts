import { AxiosResponse } from "axios";
import { base } from "./base";

export const CartApi = (
  accessToken?: string
): {
  addItem: (sellerId: string, listingId: string) => Promise<AxiosResponse<any>>;
  checkout: (sellerId: string) => Promise<AxiosResponse<any>>;
  empty: (sellerId: string) => Promise<AxiosResponse<any>>;
  emptyAll: () => Promise<AxiosResponse<any>>;
} => {
  const addItem = async (sellerId: string, listingId: string) => {
    return base.post(
      `carts/${sellerId}/add_item`,
      {
        listing_id: listingId,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const checkout = async (sellerId: string) => {
    return base.post(
      `carts/${sellerId}/checkout`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const empty = async (sellerId: string) => {
    return base.delete(`carts/${sellerId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const emptyAll = async () => {
    return base.delete("carts/empty_all", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  return { addItem, checkout, empty, emptyAll };
};
