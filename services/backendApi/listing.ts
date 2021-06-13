import { Listing } from "../../types/listings";
import { base } from "./base";

export const ListingApi = (accessToken?: string) => {
  const create = async (listing: Listing) => {
    return base.post(
      "listings",
      {
        category: listing.category,
        subcategory: listing.subcategory,
        photos: listing.photos,
        title: listing.title,
        condition: listing.condition,
        description: listing.description,
        price: listing.price,
        domestic_shipping: listing.domestic_shipping,
        status: listing.status,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const update = async ({ id, ...listing }: Listing) => {
    return base.post(
      `listings/${id}`,
      {
        category: listing.category,
        subcategory: listing.subcategory,
        photos: listing.photos,
        title: listing.title,
        condition: listing.condition,
        description: listing.description,
        price: listing.price,
        domestic_shipping: listing.domestic_shipping,
        status: listing.status,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const destroy = async (id: string) => {
    return base.delete(`listings/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  return { fetch, create, update, destroy };
};
