import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IChat} from "./interfaces/IChat";
import {first, Subject} from "rxjs";
import {IMessage} from "./interfaces/IMessage";
import {IAccount} from "./interfaces/IAccount";
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatList: IChat[] = [];
  private viewingChat: boolean = false;
  private chatViewing!: IChat;
  private account: IAccount|null = null;
  private startMessaging!: IAccount;
  private viewingNewChat: boolean = false;

  $chatList = new Subject<IChat[]>();
  $viewingChat = new Subject<boolean>();
  $chatViewing = new Subject<IChat>();
  $startMessaging = new Subject<IAccount>();
  $viewingNewChat = new Subject<boolean>();

  constructor(public http: HttpService, public accountService: AccountService) {
    this.accountService.$userAccount.subscribe( account => {
      this.account = account;
      // console.log("service got account")
    })
  }


  getAccountsChats(){
    if(this.account?.id) {
      this.http.getAccountsChats(this.account?.id).pipe(first()).subscribe({
        next: (chats) => {
          for (let chat of chats) {
            chat.messages.sort((message1: IMessage, message2: IMessage) => {
              const c = new Date(message1.createdDate);
              const d = new Date(message2.createdDate);
              return c.getTime() - d.getTime();
            });
          }
          chats.sort((chat1: IChat, chat2: IChat) => {
            const c = new Date(chat1.messages[chat1.messages.length - 1].createdDate);
            const d = new Date(chat2.messages[chat2.messages.length - 1].createdDate);
            return d.getTime() - c.getTime();
          });

          this.chatList = chats
          this.sendAccountsChats()
        },
        error: (err) => {
          console.error(err)
        }
      })
    }
  }

  updateChat(chatID: number, messageText: string, messengerID: number){
    this.http.updateChat(chatID, messageText,messengerID).pipe(first()).subscribe({
      next: (chat) => {
        chat.messages.sort((message1:IMessage, message2:IMessage) => {
          const c = new Date(message1.createdDate);
          const d = new Date(message2.createdDate);
          return c.getTime() - d.getTime();
        });
        this.chatViewing = chat
        this.getAccountsChats()
        this.$chatViewing.next(this.chatViewing)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  sendAccountsChats(){
    this.$chatList.next(this.chatList)
  }

  onChatClickService(chat: IChat){
    this.chatViewing = chat;
    this.onViewingChat()
  }

  onViewingChat(){
    this.viewingChat = !this.viewingChat;
    this.$viewingChat.next(this.viewingChat)
  }

  sendChatViewing(){
    this.$chatViewing.next(this.chatViewing)
  }

  messageClick(receiver: IAccount){
    this.startMessaging = receiver
    this.onMessaging()
  }
  onMessaging(){
    this.$startMessaging.next(this.startMessaging);
  }

  onViewingNewChat(){
    this.viewingNewChat = !this.viewingNewChat;
    this.sendViewingNewChat()
  }
  sendViewingNewChat(){
    this.$viewingNewChat.next(this.viewingNewChat)
  }

  createChat(receiverID: number, messageText: string, messengerID: number){
    this.http.createChat(receiverID, messageText, messengerID).pipe(first()).subscribe({
      next: (chat) => {
        this.chatViewing = chat
        this.sendChatViewing()
      },
      error: (err) => {
        console.error(err)
      }
    })
  }


}
