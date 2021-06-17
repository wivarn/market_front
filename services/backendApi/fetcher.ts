import { AxiosResponse } from "axios";
import { base } from "./base";

export const fetcher = async (
  url: string,
  accessToken?: string
): Promise<AxiosResponse<any>> => {
  const headers = accessToken
    ? {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    : {};
  return base.get(url, headers).then((response) => response);
};
