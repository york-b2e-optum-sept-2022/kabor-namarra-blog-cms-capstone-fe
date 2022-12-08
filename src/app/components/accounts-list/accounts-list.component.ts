import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAccount} from "../../interfaces/IAccount";
import {AccountService} from "../../account.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.css']
})
export class AccountsListComponent implements OnInit, OnDestroy{

  accountsList: IAccount[] = [];
  account: IAccount|null = null;

  onDestroy = new Subject();

  constructor(public accountService: AccountService) {
    this.accountService.$userAccount.pipe(takeUntil(this.onDestroy)).subscribe(account =>{
      this.account = account;
    })
    this.accountService.$accountList.pipe(takeUntil(this.onDestroy)).subscribe(accounts =>{
      this.accountsList = accounts;
    })
  }
  ngOnInit() {
    this.accountService.getAllAccounts()
    this.accountService.sendAccount()
  }
  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onBackClick(){
    this.accountService.exitAccountList();
  }


}
