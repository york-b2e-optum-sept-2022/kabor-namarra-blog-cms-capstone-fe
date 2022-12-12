import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IAccount} from "./interfaces/IAccount";
import {first, Subject} from "rxjs";
import {ChatService} from "./chat.service";
import {BlogService} from "./blog.service";

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
  private accountList: IAccount[] = [];
  private viewingAccountList: boolean = false;
  private viewingProfile: boolean = false;
  private accountViewing!: IAccount;

  //root toggle subjects
  $loggingIn = new Subject<boolean>();
  $registering = new Subject<boolean>();
  $logged = new Subject<boolean>();

  //account subject variables
  $userAccount = new Subject<IAccount|null>();
  $accountList = new Subject<IAccount[]>();
  $viewingAccountList = new Subject<boolean>();
  $viewingProfile = new Subject<boolean>();
  $accountViewing = new Subject<IAccount>();

  constructor(public http: HttpService, public blogService: BlogService) { }


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

  getAllAccounts(){
    this.http.getAllAccounts().pipe(first()).subscribe({
      next: (accounts) => {
        this.accountList = accounts
        this.$accountList.next(this.accountList)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  sendAccount(){
    this.$userAccount.next(this.userAccount);
  }

  viewingUsers(){
    this.viewingAccountList = !this.viewingAccountList
    this.sendViewingUsers()
  }

  setViewingUsers(){
    this.viewingAccountList = false;
  }

  sendViewingUsers(){
    this.$viewingAccountList.next(this.viewingAccountList);
  }

  searchAccountList(text:string){
    this.$accountList.next(this.accountList.filter(account => account.username.toUpperCase().includes(text.toUpperCase())))
  }


  onViewingProfile(accountID:number){
    let accountClicked = this.accountList.find(account => account.id === accountID)

    if(!accountClicked){
      alert("error occurred please try again later")
      return;
    }
    if(accountClicked){
      this.accountViewing = accountClicked
      this.blogService.setAccountViewing(accountID)
    }
    this.$viewingProfile.next(true)
  }
  setViewingProfile(){
    this.$viewingProfile.next(false)
  }

  sendAccountViewing(){
    this.$accountViewing.next(this.accountViewing)
  }


}
