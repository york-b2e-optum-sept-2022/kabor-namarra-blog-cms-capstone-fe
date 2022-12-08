import {IAccount} from "./IAccount";

export interface IMessage{
  id?: number,
  messageText: string,
  createdDate: Date,
  messenger: IAccount,
  chatID: number
}
