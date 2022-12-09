import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {AccountService} from "../../account.service";
import {ChatService} from "../../chat.service";
import {IChat} from "../../interfaces/IChat";
import {IComment} from "../../interfaces/IComment";
import {IMessage} from "../../interfaces/IMessage";
import {IAccount} from "../../interfaces/IAccount";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit, OnDestroy{

  chatList: IChat[] = [];
  account: IAccount|null = null;
  viewingChat: boolean = false;

  onDestroy = new Subject();

  constructor(public chatService: ChatService,public accountService: AccountService) {
    this.chatService.$chatList.pipe(takeUntil(this.onDestroy)).subscribe( chats => {
      this.chatList = chats
    })
    this.accountService.$userAccount.pipe(takeUntil(this.onDestroy)).subscribe(account =>{
      this.account = account;
    })
    this.chatService.$viewingChat.pipe(takeUntil(this.onDestroy)).subscribe(viewing =>{
      this.viewingChat = viewing;
    })
  }

  ngOnInit() {
    this.chatService.getAccountsChats();
    this.accountService.sendAccount();
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onBackClick(){
    this.chatService.onViewingChatList();
  }

}
