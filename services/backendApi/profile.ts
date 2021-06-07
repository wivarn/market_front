import { Profile } from "types/account";
import { base } from "./base";

export const ProfileApi = (accessToken?: string) => {
  const myProfile = async () => {
    return base.get("profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const update = async (profile: Profile) => {
    return base.post(
      "profile",
      {
        given_name: profile.givenName,
        family_name: profile.familyName,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  return { myProfile, update };
};
