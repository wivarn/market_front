import { IUser } from "./user";
import { Ilisting } from "./listings";

export interface IOffer {
  id: string;
  amount: string;
  expires_at: number;
  counter: boolean;
  buyer: IUser;
  seller: IUser;
  listing: Ilisting;
}
