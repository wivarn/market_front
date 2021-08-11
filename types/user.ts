import { IListingPreviewWithCondition } from "./listings";

export interface IUser {
  full_name: string;
  picture: { url: string };
  listings?: IListingPreviewWithCondition[];
}
