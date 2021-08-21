import { Ilisting } from "./listings";

export interface IUser {
  id?: string;
  full_name: string;
  picture: { url: string };
  listings?: Ilisting[];
  address?: { state: string; country: "CAN" | "USA" };
}
