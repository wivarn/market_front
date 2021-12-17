import { AxiosResponse } from "axios";
import { IRefundRequest } from "./../../types/order";
import { base } from "./base";

export const OrderApi = (
  accessToken?: string
): {
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
  refund: (id: string, refund: IRefundRequest) => Promise<AxiosResponse<any>>;
  cancel: (id: string) => Promise<AxiosResponse<any>>;
  feedback: (
    id: string,
    recommend: boolean | null | undefined,
    feedback: string | null | undefined
  ) => Promise<AxiosResponse<any>>;
} => {
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

  const refund = async (id: string, refund: IRefundRequest) => {
    return base.post(`orders/${id}/refund`, refund, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const cancel = async (id: string) => {
    return base.post(
      `orders/${id}/cancel`,
      { notes: "Cancelled" },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  };

  const feedback = async (
    id: string,
    recommend: boolean | null | undefined,
    feedback: string | null | undefined
  ) => {
    return base.post(
      `orders/${id}/feedback`,
      { recommend: recommend, feedback: feedback },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  };

  return { update, updateState, refund, cancel, feedback };
};
