import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IAccount} from "../../interfaces/IAccount";
import {AccountService} from "../../account.service";
import {Subject, takeUntil} from "rxjs";
import {ChatService} from "../../chat.service";

@Component({
  selector: 'app-account-display',
  templateUrl: './account-display.component.html',
  styleUrls: ['./account-display.component.css']
})
export class AccountDisplayComponent implements OnInit, OnDestroy{

  @Input() account!: IAccount;
  userAccount: IAccount|null = null;
  // messaging: boolean = false;

  onDestroy = new Subject();

  constructor(public accountService: AccountService, public chatService: ChatService) {
    this.accountService.$userAccount.pipe(takeUntil(this.onDestroy)).subscribe(account =>{
      this.userAccount = account;
    })
    // this.chatService.$viewingNewChat.pipe(takeUntil(this.onDestroy)).subscribe(viewing =>{
    //   this.messaging = viewing;
    // })
  }

  ngOnInit() {
    this.accountService.sendAccount()
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onMessageClick(){
    // this.messaging = !this.messaging;
    if(this.account) {
      this.chatService.messageClick(this.account)
    }
    // this.chatService.onViewingNewChat();
  }


}
