export interface BasicListing {
  title: string;
  price: string | number;
  currency?: string;
  domestic_shipping: string | number;
  condition: string;
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
