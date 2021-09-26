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

export interface IOrdersPaginated {
  orders: IOrder[];
  meta: { total_pages: number };
}

export interface IOrderDetails extends IOrder {
  paid_at: string | null;
  shipped_at: string | null;
  refunded_at: string | null;
  received_at: string | null;
}
