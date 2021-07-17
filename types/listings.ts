export interface BasicListing {
  title: string;
  price: string | number;
  currency?: string;
  domestic_shipping: string | number;
  international_shipping?: string | number | null;
  grading_company?: string | null;
  condition: string | number;
}

export interface Listing extends BasicListing {
  category?: string;
  subcategory?: string;
  accountId?: string;
  id?: string;
  photos: string[];
  description?: string;
  sellerName?: string;
  state?: string;
  state_transition?: string;
}

export interface ListingTemplate {
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
  photos: string[];
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
  listings: ICartListing[];
}
