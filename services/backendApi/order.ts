import { AxiosResponse } from "axios";
import { base } from "./base";

export const OrderApi = (
  accessToken?: string
): {
  purchases: () => Promise<AxiosResponse<any>>;
  update: (
    relation: string,
    id: string,
    tracking: string
  ) => Promise<AxiosResponse<any>>;
  updateState: (
    relation: string,
    id: string,
    state_transition: string
  ) => Promise<AxiosResponse<any>>;
} => {
  const purchases = async () => {
    return base.get("orders?view=purchases", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const update = async (relation: string, id: string, tracking: string) => {
    return base.post(
      `orders/${id}`,
      {
        relation: relation,
        tracking: tracking,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const updateState = async (
    relation: string,
    id: string,
    state_transition: string
  ) => {
    return base.post(
      `orders/${id}/update_state`,
      {
        relation: relation,
        state_transition: state_transition,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  return { purchases, update, updateState };
};
