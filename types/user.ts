import { Ilisting } from "./listings";

export interface IUser {
  id?: string;
  full_name: string;
  picture: { url: string };
  listings?: Ilisting[];
  address?: { state: string; country: "CAN" | "USA" };
  total_sales_with_feedback: number;
  recommendation_rate: number;
}

export interface IUserWithRole extends IUser {
  [key: string]: any;
  email: string;
  role: string;
}
