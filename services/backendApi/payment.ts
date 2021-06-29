import { AxiosResponse } from "axios";
import { base } from "./base";

export const PaymentApi = (
  accessToken?: string
): {
  linkAccount: () => Promise<AxiosResponse<any>>;
} => {
  const linkAccount = async () => {
    return base.post(
      "account/payments/link_account",
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  return { linkAccount };
};
