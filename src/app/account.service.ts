import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IAccount} from "./interfaces/IAccount";
import {first, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  //root toggle variables
  private loggingIn: boolean = false;
  private registering: boolean = false;
  private logged: boolean = false;

  //account variables
  private userAccount: IAccount| null = null;

  //root toggle subjects
  $loggingIn = new Subject<boolean>();
  $registering = new Subject<boolean>();
  $logged = new Subject<boolean>();

  //account subject variables
  $userAccount = new Subject<IAccount|null>();

  constructor(public http: HttpService) { }


  onLoginClickService(){
    this.loggingIn = !this.loggingIn;
    this.$loggingIn.next(this.loggingIn)
    console.log("1")
  }

  onRegisterClickService(){
    this.registering = !this.registering;
    this.$registering.next(this.registering);
  }

  onLogged(){
    this.logged = !this.logged;
    this.$logged.next(this.logged);
    console.log("2")
  }

  onLogoutClick(){
    this.onLogged();
    this.userAccount = null
    this.$userAccount.next(this.userAccount)
  }

  onLogin(username: string, password: string){
    this.http.onLogin(username,password).pipe(first()).subscribe({
      next: (account) => {
        this.userAccount = account
        this.onLoginClickService();
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  onRegister(account: IAccount){
    this.http.onRegister(account).pipe(first()).subscribe({
      next: (account) => {
        this.userAccount = account
        this.onRegisterClickService();
        this.onLoginClickService();
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  sendAccount(){
    this.$userAccount.next(this.userAccount);
  }


}
