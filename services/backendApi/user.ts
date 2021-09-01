import { AxiosResponse } from "axios";
import { base } from "./base";

export const UserApi = (
  accessToken?: string
): {
  updateRole: (email: string, role: string) => Promise<AxiosResponse<any>>;
} => {
  const updateRole = async (email: string, role: string) => {
    return base.put(
      "users/update_role",
      {
        email: email,
        role: role,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  return { updateRole };
};
