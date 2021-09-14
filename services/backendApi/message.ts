import { AxiosResponse } from "axios";
import { base } from "./base";

export const MessageApi = (
  accessToken?: string
): {
  create: (recipientId: string, body: string) => Promise<AxiosResponse<any>>;
} => {
  const create = async (recipientId: string, body: string) => {
    return base.post(
      "messages",
      {
        recipient_id: recipientId,
        body: body,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  };

  return { create };
};
