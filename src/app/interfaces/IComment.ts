import {IAccount} from "./IAccount";
import {IBlog} from "./IBlog";

export interface IComment{
  id?:number,
  createdDate: Date,
  updatedDate: Date,
  body: string,
  author: IAccount,
  blogID: number
}
