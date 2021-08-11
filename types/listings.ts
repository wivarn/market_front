import { IUser } from "types/user";

interface _IListingMinimum {
  id: string;
  photos: { url: string }[];
  title: string;
  price: string;
  currency: string;
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
  aasm_state: string;
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

export interface IListingWithSeller extends IListing {
  seller: IUser;
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
  seller_id: string;
  given_name: string;
  family_name: string;
  total: number;
  listings: IListingPreview[];
}
