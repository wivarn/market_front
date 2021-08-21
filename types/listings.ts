import { IUser } from "types/user";

export interface Ilisting {
  id: string;
  photos: { url: string }[];
  title: string;
  grading_company: string | null;
  condition: string;
  currency: string;
  price: string;
  aasm_state: string;
  shipping: string;
}

export interface IlistingDetails extends Ilisting {
  description: string;
  category: string;
  subcategory: string;
  combined_shipping: string;
  seller: IUser;
}

export interface IListingFormData {
  title: string;
  price: string | number;
  currency?: string;
  domestic_shipping: string | number;
  international_shipping?: string | number | null;
  grading_company?: string | null;
  condition: string | number;
  category?: string;
  subcategory?: string;
  accountId?: string;
  id?: string;
  photos: { url: string }[];
  description?: string;
  aasm_state?: string;
  state_transition?: string;
  combined_shipping?: string | number | null;
}

export interface IListingTemplate {
  [key: string]: string | number | undefined | boolean;
  category?: string;
  subcategory?: string;
  accountId?: string;
  title?: string;
  description?: string;
  grading_company?: string;
  condition?: string | number;
  price?: string | number;
  domestic_shipping?: string | number;
  international_shipping?: string | number;
}

export interface ICartListing {
  id: string;
  photos: { url: string }[];
  title: string;
  currency: string;
  price: string;
  shipping_country: string;
  domestic_shipping: string;
  international_shipping?: string;
}

export interface ICart {
  seller: {
    id: string;
    full_name: string;
  };
  total: string;
  listings: Ilisting[];
}
