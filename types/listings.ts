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
  status?: string;
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
