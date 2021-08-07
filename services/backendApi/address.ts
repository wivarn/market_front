import { AxiosResponse } from "axios";
import { IAddress } from "types/account";
import { base } from "./base";

export const AddressApi = (
  accessToken?: string
): {
  get: () => Promise<AxiosResponse<any>>;
  update: (address: IAddress) => Promise<AxiosResponse<any>>;
} => {
  const get = async () => {
    return base.get("account/address", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const update = async (address: IAddress) => {
    return base.post(
      "account/address",
      {
        street1: address.street1,
        street2: address.street2,
        city: address.city,
        state: address.state,
        zip: address.zip,
        country: address.country,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  return { get, update };
};
