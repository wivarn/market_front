import { Profile } from "types/account";
import { base } from "./base";

export const ProfileApi = (accessToken?: string) => {
  const update = async (profile: Profile) => {
    return base.post(
      "account/profile",
      {
        given_name: profile.givenName,
        family_name: profile.familyName,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  return { update };
};
