import { Address } from "types/account";
import { base } from "./base";

export const AddressApi = (accessToken?: string) => {
  const update = async (address: Address) => {
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

  return { update };
};
