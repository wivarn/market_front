import { AxiosResponse } from "axios";
import { base } from "./base";

export const PaymentApi = (
  accessToken?: string
): {
  get: () => Promise<AxiosResponse<any>>;
  linkAccount: () => Promise<AxiosResponse<any>>;
} => {
  const get = async () => {
    return base.get("account/payments", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const linkAccount = async () => {
    return base.post(
      "account/payments/link_account",
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  return { get, linkAccount };
};
