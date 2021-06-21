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
  category?: string | null;
  subcategory?: string | null;
  accountId?: string;
  title?: string | null;
  description?: string | null;
  grading_company?: string | null;
  condition?: string | number | null;
  price?: string | number | null;
  domestic_shipping?: string | number | null;
  international_shipping?: string | number | null;
}
