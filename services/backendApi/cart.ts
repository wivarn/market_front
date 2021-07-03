import { AxiosResponse } from "axios";
import { base } from "./base";

export const CartApi = (
  accessToken?: string
): {
  addItem: (listingId: number | string) => Promise<AxiosResponse<any>>;
  checkout: () => Promise<AxiosResponse<any>>;
} => {
  const addItem = async (listingId: number | string) => {
    return base.post(
      "cart/add_item",
      {
        listing_id: listingId,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const checkout = async () => {
    return base.post(
      "cart/checkout",
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  return { addItem, checkout };
};