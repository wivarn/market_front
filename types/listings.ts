import { IUser } from "types/user";

interface _IListingMinimum {
  id: string;
  photos: { url: string }[];
  title: string;
  price: string;
  currency: string;
  aasm_state: string;
}

export interface IBasicListing {
  title: string;
  price: string | number;
  currency?: string;
  domestic_shipping: string | number;
  international_shipping?: string | number | null;
  grading_company?: string | null;
  condition: string | number;
}

export interface IListingPreview extends _IListingMinimum {
  shipping: string;
}

export interface IListingPreviewWithCondition extends _IListingMinimum {
  shipping: string;
  grading_company: string;
  condition: string;
}

export interface IlistingDetails extends _IListingMinimum {
  grading_company: string | null;
  condition: string;
  category: string;
  subcategory: string;
  seller: IUser;
  description: string;
  shipping: string;
  combined_shipping: string;
}

export interface IListing extends IBasicListing {
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
  listings: IListingPreview[];
}
