import axios, { AxiosResponse } from "axios";

import { Listing } from "../../types/listings";
import { base } from "./base";

export const ListingApi = (
  accessToken?: string
): {
  create: (formData: FormData) => Promise<AxiosResponse<any>>;
  bulkCreate: (listings: Listing[]) => Promise<AxiosResponse<any>>;
  update: (
    id: string,
    formData: FormData,
    imageData: File[]
  ) => Promise<void | AxiosResponse<any>>;
  updateState: (
    id: string,
    state_transition: string
  ) => Promise<AxiosResponse<any>>;
  uploadPhotosCredentials: (
    id: string,
    number_of_photos: number
  ) => Promise<AxiosResponse<any>>;
  updatePhotosKeys: (id: string, keys: string[]) => Promise<AxiosResponse<any>>;
  destroy: (id: string) => Promise<AxiosResponse<any>>;
} => {
  const create = async (formData: FormData) => {
    return base.post("listings", formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const bulkCreate = async (listings: Listing[]) => {
    return base.post(
      "listings/bulk_create",
      { listings: listings },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const update = async (id: string, formData: FormData, photos?: File[]) => {
    if (process.env.VERCEL) {
      const listingResponse = await base.post(`listings/${id}`, formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (photos?.length) {
        const credentialsResponse = await uploadPhotosCredentials(
          id,
          photos?.length
        );
        const keys: string[] = await Promise.all(
          credentialsResponse.data.map(
            async (
              {
                uri,
                ...credentials
              }: {
                uri: string;
                credentials: any;
              },
              index: number
            ) => {
              const formData = new FormData();
              Object.entries(credentials).forEach(([key, value]) => {
                formData.append(key, `${value}`);
              });
              formData.append("file", photos[index]);
              const uploadResponse = await axios.post(uri, formData);
              return new URL(
                uploadResponse.request.responseURL
              ).searchParams.get("key");
            }
          )
        );
        await updatePhotosKeys(id, keys);
      }
      return listingResponse;
    } else {
      if (photos?.length) {
        for (let i = 0; i < photos.length; i++) {
          formData.append("photos[]", photos[i]);
        }
      }
      return base.post(`listings/${id}`, formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }
  };

  const updateState = async (id: string, state_transition: string) => {
    return base.post(
      `listings/${id}`,
      {
        state_transition: state_transition,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const uploadPhotosCredentials = async (
    id: string,
    number_of_photos: number
  ) => {
    return base.get(
      `listings/${id}/upload_photos_credentials?number_of_photos=${number_of_photos}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const updatePhotosKeys = async (id: string, keys: string[]) => {
    return base.put(
      `listings/${id}/update_photo_keys`,
      { keys: keys },
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

  return {
    create,
    bulkCreate,
    update,
    updateState,
    uploadPhotosCredentials,
    updatePhotosKeys,
    destroy,
  };
};
