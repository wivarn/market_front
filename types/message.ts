import { IUser } from "types/user";
export interface IMessage {
  sender_id: string;
  recipient_id: string;
  body: string;
  created_at: string;
}

export interface IMessageWithCorrespondents extends IMessage {
  sender: IUser;
  recipient: IUser;
}
