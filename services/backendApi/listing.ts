import axios, { AxiosResponse } from "axios";

import { IListingFormData } from "../../types/listings";
import { base } from "./base";

export const ListingApi = (
  accessToken?: string
): {
  create: (formData: FormData, photos?: File[]) => Promise<AxiosResponse<any>>;
  bulkCreate: (listings: IListingFormData[]) => Promise<AxiosResponse<any>>;
  edit: (id: string | number) => Promise<AxiosResponse<any>>;
  update: (
    id: string | number,
    formData: FormData,
    imageData: File[]
  ) => Promise<AxiosResponse<any>>;
  updateState: (
    id: string | number,
    state_transition: string
  ) => Promise<AxiosResponse<any>>;
  uploadPhotosCredentials: (
    id: string | number,
    number_of_photos: number
  ) => Promise<AxiosResponse<any>>;
  updatePhotosKeys: (
    id: string | number,
    keys: string[]
  ) => Promise<AxiosResponse<any>>;
  destroy: (id: string | number) => Promise<AxiosResponse<any>>;
} => {
  const create = async (formData: FormData, photos?: File[]) => {
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
      const listingResponse = await base.post("listings", formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const id = listingResponse.data.id;
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
      return base.post("listings", formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }
  };

  const bulkCreate = async (listings: IListingFormData[]) => {
    return base.post(
      "listings/bulk_create",
      { listings: listings },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const edit = async (id: string | number) => {
    return base.get(`listings/${id}/edit`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const update = async (
    id: string | number,
    formData: FormData,
    photos?: File[]
  ) => {
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
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

  const updateState = async (id: string | number, state_transition: string) => {
    return base.post(
      `listings/${id}/update_state`,
      {
        state_transition: state_transition,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const uploadPhotosCredentials = async (
    id: string | number,
    number_of_photos: number
  ) => {
    return base.get(
      `listings/${id}/upload_photos_credentials?number_of_photos=${number_of_photos}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const updatePhotosKeys = async (id: string | number, keys: string[]) => {
    return base.put(
      `listings/${id}/update_photo_keys`,
      { keys: keys },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const destroy = async (id: string | number) => {
    return base.delete(`listings/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  return {
    create,
    bulkCreate,
    edit,
    update,
    updateState,
    uploadPhotosCredentials,
    updatePhotosKeys,
    destroy,
  };
};
