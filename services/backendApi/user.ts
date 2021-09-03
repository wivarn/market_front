import { AxiosResponse } from "axios";
import { base } from "./base";

export const UserApi = (
  accessToken?: string
): {
  listRoles: () => Promise<AxiosResponse<any>>;
  updateRole: (email: string, role: string) => Promise<AxiosResponse<any>>;
} => {
  const listRoles = async () => {
    return base.get("users/list_roles", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

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

  return { listRoles, updateRole };
};
