import { IUser } from "./user";
import { Ilisting } from "./listings";

export interface IOffer {
  id: string;
  amount: string;
  buyer: IUser;
  seller: IUser;
  listing: Ilisting;
}
