import { IAddress } from "./account";
import { Ilisting } from "types/listings";

export interface IOrder {
  id: string;
  aasm_state: string;
  address: IAddress;
  buyer: {
    id: string;
    full_name: string;
  };
  seller: {
    id: string;
    full_name: string;
  };
  total: string;
  tracking: string;
  listings: Ilisting[];
  created_at: string;
  updated_at: string;
}
