import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAccount} from "./interfaces/IAccount";
import {IBlog} from "./interfaces/IBlog";
import {IComment} from "./interfaces/IComment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) { }

  onLogin(username:string, password:string){
    return this.http.get(`http://localhost:8080/api/account?username=${username}&password=${password}`)as Observable<IAccount>
  }

  onRegister(account: IAccount){
    return this.http.post("http://localhost:8080/api/account", {
      username: account.username,
      password: account.password,
      firstname: account.firstname,
      lastname: account.lastname
    })as Observable<IAccount>
  }

  getBlogs(){
    return this.http.get("http://localhost:8080/api/blog/all")as Observable<IBlog[]>
  }

  createBlog(title: string, body:string, authorID: number){
    return this.http.post("http://localhost:8080/api/blog", {title: title,body: body,authorID: authorID})as Observable<IBlog>
  }

  updateBlog(blog: IBlog){
    return this.http.put("http://localhost:8080/api/blog", {id:blog.id, title:blog.title,body:blog.body, viewerID: blog.viewerID})as Observable<IBlog>
  }

  deleteBlog(blogID: number){
    return this.http.delete(`http://localhost:8080/api/blog?id=${blogID}`)
  }

  createComment(body:string,authorID: number, blogID: number){
    return this.http.post("http://localhost:8080/api/comment", {body:body,authorID:authorID,blogID:blogID})as Observable<IComment>
  }

  updateComment(comment: IComment){
    return this.http.put("http://localhost:8080/api/comment", {id: comment.id, body: comment.body})as Observable<IComment>
  }

  deleteComment(commentID: number){
    return this.http.delete(`http://localhost:8080/api/comment?id=${commentID}`)
  }
}
