import { Listing } from "./listings";

export interface IUser {
  given_name: string;
  family_name: string;
  picture: string;
  listings?: Listing[];
}
