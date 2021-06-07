import { base } from "./base";

export const fetcher = async (url: string, accessToken?: string) => {
  const headers = accessToken
    ? {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    : {};
  return base.get(url, headers).then((response) => response);
};
