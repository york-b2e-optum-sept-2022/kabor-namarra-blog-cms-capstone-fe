import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAccount} from "./interfaces/IAccount";
import {IBlog} from "./interfaces/IBlog";

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
}
