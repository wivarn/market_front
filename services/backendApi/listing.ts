import { Listing } from "../../types/listings";
import { base } from "./base";

export const ListingApi = (accessToken?: string) => {
  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  const fetch = async (path: string) => {
    return base.get(path, {
      headers: headers,
    });
  };

  const create = async (listing: Listing) => {
    return base.post(
      "listings",
      {
        listing: {
          photos: listing.photos,
          title: listing.title,
          condition: listing.condition,
          currency: listing.currency,
          description: listing.description,
          price: listing.price,
          domestic_shipping: listing.domestic_shipping,
          status: listing.status,
        },
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
        listing: {
          photos: listing.photos,
          title: listing.title,
          condition: listing.condition,
          currency: listing.currency,
          description: listing.description,
          price: listing.price,
          domestic_shipping: listing.domestic_shipping,
          status: listing.status,
        },
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
