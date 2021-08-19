import { IListingPreviewWithCondition } from "./listings";

export interface IUser {
  id?: string;
  full_name: string;
  picture: { url: string };
  listings?: IListingPreviewWithCondition[];
  address?: { state: string; country: "CAN" | "USA" };
}
