import axios, { AxiosResponse } from "axios";

import { IListingFormData } from "../../types/listings";
import { base } from "./base";

export const ListingApi = (
  accessToken?: string
): {
  create: (
    formData: FormData,
    photos: (File | string)[]
  ) => Promise<AxiosResponse<any>>;
  bulkCreate: (listings: IListingFormData[]) => Promise<AxiosResponse<any>>;
  edit: (id: string | number) => Promise<AxiosResponse<any>>;
  update: (
    id: string | number,
    formData: FormData,
    imageData: (File | string)[],
    removedPhotos: { url: string }[]
  ) => Promise<AxiosResponse<any>>;
  updateState: (
    id: string | number,
    state_transition: string
  ) => Promise<AxiosResponse<any>>;
  destroy: (id: string | number) => Promise<AxiosResponse<any>>;
} => {
  const create = async (formData: FormData, photos: (File | string)[]) => {
    const listingResponse = await base.post("listings", formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const id = listingResponse.data.id;
    if (photos?.length) {
      const presignedPutUrlsResponse = await _presignedPutUrls(
        `${id}`,
        photos.map((photo) => (typeof photo == "string" ? photo : photo.name))
      );
      const keys: string[] = await Promise.all(
        presignedPutUrlsResponse.data.map(
          async ({ url, key }: { url: string; key: string }, index: number) => {
            if (url) {
              if (process.env.NEXT_PUBLIC_VERCEL_URL) {
                await axios.put(url, photos[index]);
              } else {
                const fd = new FormData();
                fd.append("file", photos[index]);
                await axios.put(`/api/saveFile/${url}`, fd);
              }
            }
            return key;
          }
        )
      );
      await _updatePhotosKeys(id, keys);
    }
    return listingResponse;
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
    photos: (File | string)[],
    removedPhotos: { url: string }[]
  ) => {
    const listingResponse = await base.post(`listings/${id}`, formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (photos?.length) {
      const presignedPutUrlsResponse = await _presignedPutUrls(
        `${id}`,
        photos.map((photo) => (typeof photo == "string" ? photo : photo.name))
      );
      const keys: string[] = await Promise.all(
        presignedPutUrlsResponse.data.map(
          async ({ url, key }: { url: string; key: string }, index: number) => {
            if (url) {
              if (process.env.NEXT_PUBLIC_VERCEL_URL) {
                await axios.put(url, photos[index]);
              } else {
                const fd = new FormData();
                fd.append("file", photos[index]);
                await axios.put(`/api/saveFile/${url}`, fd);
              }
            }
            return key;
          }
        )
      );
      await _updatePhotosKeys(id, keys, removedPhotos);
    }
    return listingResponse;
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

  const _presignedPutUrls = async (id: string, filenames: string[]) => {
    return base.post(
      `listings/${id}/presigned_put_urls`,
      { filenames: filenames },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const _updatePhotosKeys = async (
    id: string | number,
    keys: string[],
    removedPhotos?: { url: string }[]
  ) => {
    return base.put(
      `listings/${id}/update_photo_keys`,
      { keys: keys, removed_photos: removedPhotos || [] },
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
    destroy,
  };
};
