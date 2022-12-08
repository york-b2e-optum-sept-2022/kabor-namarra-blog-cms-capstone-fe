import {IAccount} from "./IAccount";
import {IMessage} from "./IMessage";

export interface IChat{
  id?: number,
  lastUpdate: Date,
  messenger: IAccount[],
  messages: IMessage[]
}
