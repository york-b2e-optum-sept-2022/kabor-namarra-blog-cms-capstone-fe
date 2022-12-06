import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "../../account.service";
import {IAccount} from "../../interfaces/IAccount";
import {Subject, takeUntil} from "rxjs";
import {BlogService} from "../../blog.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy{

  account: IAccount|null = null;
  viewingBlog: boolean = false;

  onDestroy = new Subject();

  constructor(public accountService: AccountService, public blogService: BlogService) {
    this.accountService.$userAccount.pipe(takeUntil(this.onDestroy)).subscribe(account =>{
      this.account = account;
      console.log(this.account)
    })
    this.blogService.$viewingBlog.pipe(takeUntil(this.onDestroy)).subscribe(viewing =>{
      this.viewingBlog = viewing;
    })
  }
  ngOnInit() {
    this.accountService.sendAccount();
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onLoginClick(){
    this.accountService.onLoginClickService();
  }

  onLogoutClick(){
    this.accountService.onLogoutClick();
  }

  onClickCheck(){
    console.log(this.account === null)
  }

}
