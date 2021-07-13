import { AxiosResponse } from "axios";
import { base } from "./base";

export const CartApi = (
  accessToken?: string
): {
  addItem: (sellerId: string, listingId: string) => Promise<AxiosResponse<any>>;
  checkout: (sellerId: string) => Promise<AxiosResponse<any>>;
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

  return { addItem, checkout };
};
