import { Address } from "./account";
import { ICartListing } from "./listings";
import { IUser } from "types/user";

export interface IOrder {
  id: string;
  aasm_state: string;
  address: Address;
  buyer: IUser;
  buyer_id: string;
  seller: IUser;
  seller_id: string;
  total: string;
  tracking: string;
  listings: ICartListing[];
}
