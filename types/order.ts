import { IAddress } from "./account";
import { IListingPreview } from "types/listings";
import { IUser } from "types/user";

export interface IOrder {
  id: string;
  aasm_state: string;
  address: IAddress;
  buyer: IUser;
  buyer_id: string;
  seller: IUser;
  seller_id: string;
  total: string;
  tracking: string;
  listings: IListingPreview[];
  created_at: string;
  updated_at: string;
}
