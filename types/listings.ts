import { IOffer } from "types/offer";
import { IUser } from "types/user";

export interface Ilisting {
  id: string;
  photos: { url: string }[];
  title: string;
  category: string;
  grading_company: string | null;
  condition: string;
  currency: string;
  price: string;
  aasm_state: string;
  shipping: string | number;
  accept_offers: boolean;
  accepted_offer?: IOffer;
}

export interface IListingsPaginated {
  listings: Ilisting[];
  meta: { total_pages: number };
}

export interface IlistingDetails extends Ilisting {
  description: string;
  subcategory: string;
  combined_shipping: string;
  seller: IUser;
  reserved_at: string;
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
  accept_offers: boolean;
}

export interface IListingTemplate {
  [key: string]: string | number | boolean | undefined | null;
  category?: string;
  subcategory?: string;
  title?: string;
  description?: string;
  grading_company?: string;
  condition?: string | number;
  price?: string | number;
  domestic_shipping?: string | number;
  international_shipping?: string | number;
  combined_shipping?: string | number;
  accept_offers: boolean;
}

export interface ICart {
  checkout_session_id: string | null;
  seller: {
    id: string;
    full_name: string;
  };
  total: string;
  listings: Ilisting[];
}
