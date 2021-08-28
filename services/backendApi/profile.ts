import axios, { AxiosResponse } from "axios";

import { base } from "./base";
import { toast } from "react-toastify";

export const ProfileApi = (
  accessToken?: string
): {
  get: () => Promise<AxiosResponse<any>>;
  update: (
    formData: FormData,
    picture?: File | null
  ) => Promise<void | AxiosResponse<any>>;
  settings: () => Promise<AxiosResponse<any>>;
} => {
  const get = async () => {
    return base.get("account/profile", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const update = async (formData: FormData, picture?: File | null) => {
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
      return base
        .post("account/profile", formData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => {
          if (picture) {
            _presignedPutUrl(picture.name).then((res) => {
              const identifier = res.data.identifier;
              axios.put(res.data.url, picture).then(() => {
                _updatePictureIdentifier(identifier).then(() => {
                  toast.success("Your profile has been updated");
                });
              });
            });
          }
        });
    } else {
      if (picture) {
        formData.append("picture", picture);
      }
      return base
        .post("account/profile", formData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => {
          toast.success("Your profile has been updated");
        });
    }
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

  return { get, update, settings };
};
