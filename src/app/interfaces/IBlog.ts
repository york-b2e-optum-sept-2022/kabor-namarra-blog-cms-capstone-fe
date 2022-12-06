import {IAccount} from "./IAccount";

export interface IBlog{
  id?: number,
  title: string,
  body: string,
  createdDate: Date,
  updatedDate: Date,
  author: IAccount,
  views: number,
  // comments: []

}
