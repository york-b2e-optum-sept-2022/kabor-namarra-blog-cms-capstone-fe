import {IAccount} from "./IAccount";
import {IComment} from "./IComment";

export interface IBlog{
  id?: number,
  title: string,
  body: string,
  createdDate: Date,
  updatedDate: Date,
  author: IAccount,
  views: number,
  comments: IComment[]

}
