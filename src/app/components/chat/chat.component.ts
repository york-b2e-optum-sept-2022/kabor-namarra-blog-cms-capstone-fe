import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from "../../chat.service";
import {IChat} from "../../interfaces/IChat";
import {Subject, takeUntil} from "rxjs";
import {AccountService} from "../../account.service";
import {IAccount} from "../../interfaces/IAccount";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy{

  chat!: IChat;
  messageText: string = "";
  account: IAccount|null = null;
  receiver: IAccount|null = null;
  newChat: boolean = false;

  onDestroy = new Subject();

  constructor(public chatService: ChatService,public accountService: AccountService) {
    this.chatService.$chatViewing.pipe(takeUntil(this.onDestroy)).subscribe(chat =>{
      this.chat = chat;
      console.log("got 1")
      console.log(this.chat)
    })
    this.accountService.$userAccount.pipe(takeUntil(this.onDestroy)).subscribe(account =>{
      this.account = account;
      console.log("got 2")
      console.log(this.account)
    })
    this.chatService.$accountReceiving.pipe(takeUntil(this.onDestroy)).subscribe(account =>{
      this.receiver = account;
      console.log("got 3")
      console.log(this.receiver)
    })
    this.chatService.$viewingNewChat.pipe().pipe(takeUntil(this.onDestroy)).subscribe(viewing =>{
      this.newChat = viewing;
      console.log("got 4")
      console.log(this.newChat)
    })
  }

  ngOnInit() {
    this.chatService.sendViewingNewChat()
    this.chatService.onMessaging()
    this.accountService.sendAccount()
    this.chatService.sendChatViewing()
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onBackClick(){
    this.chatService.onViewingChat()
  }

  onSendClick(){
    if(this.messageText === ""){
      return;
    }
    if(this.chat.id && this.account?.id) {
      this.chatService.updateChat(this.chat.id, this.messageText, this.account?.id)
      this.messageText = "";
    }
  }
  onCheckSendClick(){
    if(this.messageText === ""){
      return;
    }
    if(this.chat.id && this.account?.id) {
      this.chatService.updateChat(this.chat.id, this.messageText, this.account?.id)
      this.messageText = "";
    }
  }

  onCreateChat(){
    if(this.messageText === ""){
      return;
    }
    if(this.account?.id && this.receiver?.id) {
      this.chatService.createChat(this.receiver.id, this.messageText, this.account?.id)
      this.messageText = "";
      this.newChat = false;
    }
  }

  onLeaveNewChat(){
    this.chatService.onViewingChatFromList()
  }

}
