import { IUser } from "./user";
import { Ilisting } from "./listings";

export interface IOffer {
  id: string;
  amount: string;
  expires_at: number;
  counter: boolean;
}

export interface IOfferDetailed extends IOffer {
  buyer: IUser;
  seller: IUser;
  listing: Ilisting;
}
