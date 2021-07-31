import axios, { AxiosResponse } from "axios";

import { base } from "./base";

export const ProfileApi = (
  accessToken?: string
): {
  update: (
    formData: FormData,
    picture?: string | Blob
  ) => Promise<void | AxiosResponse<any>>;
  uploadPictureCredentials: () => Promise<AxiosResponse<any>>;
  updatePictureKey: (key: string) => Promise<AxiosResponse<any>>;
} => {
  const update = async (formData: FormData, picture?: string | Blob) => {
    if (process.env.VERCEL) {
      return base
        .post("account/profile", formData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => {
          if (picture) {
            uploadPictureCredentials().then((res) => {
              const { uri, ...credentials } = res.data;
              const formData = new FormData();
              Object.entries(credentials).forEach(([key, value]) => {
                formData.append(key, `${value}`);
              });
              formData.append("file", picture);
              axios.post(uri, formData).then((res) => {
                const key = new URL(res.request.responseURL).searchParams.get(
                  "key"
                );
                updatePictureKey(`${key}`);
              });
            });
          }
        });
    } else {
      if (picture) {
        formData.append("picture", picture);
      }
      return base.post("account/profile", formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }
  };

  const uploadPictureCredentials = async () => {
    return base.get("account/profile/upload_picture_credentials", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const updatePictureKey = async (key: string) => {
    return base.put(
      "account/profile/update_picture_key",
      { key: key },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  return { update, uploadPictureCredentials, updatePictureKey };
};
