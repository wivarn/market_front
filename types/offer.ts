import { IUser } from "./user";
import { Ilisting } from "./listings";

export interface IOffer {
  id: string;
  amount: string;
  expires_at: number;
  counter: boolean;
  currency: string;
  buyer: IUser;
  seller: IUser;
  listing: Ilisting;
}
