import { AxiosResponse } from "axios";
import { IEmailSettings } from "./../../types/account";
import { base } from "./base";

export const EmailSettingsApi = (
  accessToken?: string
): {
  get: () => Promise<AxiosResponse<any>>;
  update: (emailSettings: IEmailSettings) => Promise<AxiosResponse<any>>;
} => {
  const get = async () => {
    return base.get("account/email_settings", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const update = async (emailSettings: IEmailSettings) => {
    return base.post(
      "account/email_settings",
      {
        marketing: emailSettings.marketing,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  return { get, update };
};
