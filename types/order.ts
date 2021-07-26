import { Address } from "./account";
import { IUser } from "types/user";
import { Listing } from "./listings";

export interface IOrder {
  id: string | number;
  aasm_state: string;
  address: Address;
  buyer: IUser;
  buyer_id: string | number;
  seller: IUser;
  seller_id: string | number;
  total: string | number;
  tracking: string;
  listings: Listing[];
}
