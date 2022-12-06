import {IAccount} from "./IAccount";
import {IBlog} from "./IBlog";

export interface IComment{
  createdDate: Date,
  updatedDate: Date,
  body: string,
  author: IAccount,
  blog: IBlog
}
