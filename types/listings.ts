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
  [key: string]: any;
  id?: number;
  title: string;
  price: string | number;
  currency?: string;
  domestic_shipping: string | number;
  international_shipping: string | number;
  combined_shipping: string | number;
  grading_company: string;
  condition: string | number;
  category: string;
  subcategory: string;
  photos: { url: string }[] | never[];
  description: string;
  aasm_state: string;
  state_transition?: string;
}

export interface IListingTemplate {
  [key: string]: string | number | undefined | boolean | null;
  category?: string | null;
  subcategory?: string | null;
  title?: string | null;
  description?: string | null;
  grading_company?: string | null;
  condition?: string | number | null;
  price?: string | number | null;
  domestic_shipping?: string | number | null;
  international_shipping?: string | number | null;
  combined_shipping?: string | number | null;
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
