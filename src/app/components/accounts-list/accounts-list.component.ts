import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAccount} from "../../interfaces/IAccount";
import {AccountService} from "../../account.service";
import {Subject, takeUntil} from "rxjs";
import {ChatService} from "../../chat.service";

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.css']
})
export class AccountsListComponent implements OnInit, OnDestroy{

  accountsList: IAccount[] = [];
  account: IAccount|null = null;
  messaging: boolean = false;

  onDestroy = new Subject();

  constructor(public accountService: AccountService, public chatService: ChatService) {
    this.accountService.$userAccount.pipe(takeUntil(this.onDestroy)).subscribe(account =>{
      this.account = account;
    })
    this.accountService.$accountList.pipe(takeUntil(this.onDestroy)).subscribe(accounts =>{
      this.accountsList = accounts;
    })
    this.chatService.$viewingChatFromList.pipe(takeUntil(this.onDestroy)).subscribe(viewing =>{
      this.messaging = viewing;
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
    this.accountService.viewingUsers();
  }


}
