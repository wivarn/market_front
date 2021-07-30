import { AxiosResponse } from "axios";
import { base } from "./base";

export const ProfileApi = (
  accessToken?: string
): {
  update: (formData: FormData) => Promise<AxiosResponse<any>>;
} => {
  const update = async (formData: FormData) => {
    return base.post("account/profile", formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  return { update };
};
