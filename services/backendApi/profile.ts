import { base } from "./base";

export const ProfileApi = (accessToken: string) => {
  const myProfile = async () => {
    return base.get("profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  return { myProfile };
};
