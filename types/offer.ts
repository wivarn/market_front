import { IUser } from "./user";
import { Ilisting } from "./listings";

export interface IOffer {
  id: string;
  amount: string;
  expires_at: string;
  counter: boolean;
}

export interface IOfferDetailed extends IOffer {
  aasm_state: string;
  buyer: IUser;
  seller: IUser;
  listing: Ilisting;
}
