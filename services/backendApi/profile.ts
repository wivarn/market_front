import axios, { AxiosResponse } from "axios";

import { base } from "./base";

export const ProfileApi = (
  accessToken?: string
): {
  get: () => Promise<AxiosResponse<any>>;
  update: (
    formData: FormData,
    picture: File | null
  ) => Promise<void | AxiosResponse<any>>;
  updateCurrency: (currency: string) => Promise<void | AxiosResponse<any>>;
  settings: () => Promise<AxiosResponse<any>>;
} => {
  const get = async () => {
    return base.get("account/profile", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const update = async (formData: FormData, picture: File | null) => {
    const profileResponse = await base.post("account/profile", formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (picture) {
      const presignedPutUrlResponse = await _presignedPutUrl(picture.name);
      const { url, identifier } = presignedPutUrlResponse.data;

      if (process.env.NEXT_PUBLIC_VERCEL_URL) {
        await axios.put(url, picture);
      } else {
        const fd = new FormData();
        fd.append("file", picture);
        await axios.put(`/api/saveFile/${url}`, fd);
      }

      await _updatePictureIdentifier(identifier);
    }

    return profileResponse;
  };

  const updateCurrency = async (currnecy: string) => {
    return base.put(
      "account/profile/profile",
      { currnecy: currnecy },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  const settings = async () => {
    return base.get("account/profile/settings", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const _presignedPutUrl = async (filename: string) => {
    return base.get(`account/profile/presigned_put_url?filename=${filename}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const _updatePictureIdentifier = async (identifier: string) => {
    return base.put(
      "account/profile/update_picture_identifier",
      { identifier: identifier },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  return { get, update, updateCurrency, settings };
};
