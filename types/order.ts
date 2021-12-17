import { IAddress } from "./account";
import { Ilisting } from "types/listings";

export interface IOrder {
  [key: string]: any;
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
  refunds: IRefund[];
  refunded_total: string;
  recommend: boolean | null;
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

export interface IRefundRequest {
  amount: string | number;
  reason: string;
  notes?: string;
}

export interface IRefund extends IRefundRequest {
  status: string;
  updated_at: string;
}
