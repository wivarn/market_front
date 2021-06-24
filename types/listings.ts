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
  category?: string | undefined;
  subcategory?: string | undefined;
  accountId?: string;
  title?: string | undefined;
  description?: string | undefined;
  grading_company?: string | undefined;
  condition?: string | number | undefined;
  price?: string | number | undefined;
  domestic_shipping?: string | number | undefined;
  international_shipping?: string | number | undefined;
}
