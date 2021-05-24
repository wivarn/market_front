export interface BasicListing {
  title: string;
  price: string;
  currency: string;
  domestic_shipping: string;
  condition: string;
}

export interface Listing extends BasicListing {
  id?: string;
  photos: string[];
  description?: string;
  sellerName?: string;
}
