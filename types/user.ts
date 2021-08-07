import { IListing } from "./listings";

export interface IUser {
  given_name: string;
  family_name: string;
  picture: { url: string };
  listings?: IListing[];
}
