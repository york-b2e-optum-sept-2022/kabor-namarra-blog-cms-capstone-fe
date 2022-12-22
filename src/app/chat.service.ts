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
  private viewingChatList: boolean = false;
  private chatViewing!: IChat;
  private account: IAccount|null = null;
  private accountReceiving: IAccount|null = null;
  private viewingNewChat: boolean = false;
  private viewingChatFromList: boolean = false;

  $chatList = new Subject<IChat[]>();
  $viewingChat = new Subject<boolean>();
  $viewingChatList = new Subject<boolean>();
  $chatViewing = new Subject<IChat>();
  $accountReceiving = new Subject<IAccount>();
  $viewingNewChat = new Subject<boolean>();
  $viewingChatFromList = new Subject<boolean>();

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
              return d.getTime() - c.getTime();
            });
          }
          chats.sort((chat1: IChat, chat2: IChat) => {
            const c = new Date(chat1.messages[chat1.messages.length - 1].createdDate);
            const d = new Date(chat2.messages[chat2.messages.length - 1].createdDate);
            return  c.getTime() -d.getTime();
          });

          this.chatList = chats
          this.sendAccountsChats()
        },
        error: (err) => {
          alert("There was a server error while trying to retrieve chats. Please try again later.")
          // console.error(err)
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
          return d.getTime() - c.getTime();
        });
        this.chatViewing = chat
        this.getAccountsChats()
        this.$chatViewing.next(this.chatViewing)
      },
      error: (err) => {
        alert("There was a server error while trying to update chat. Please try again later.")
        // console.error(err)
      }
    })
  }

  sendAccountsChats(){
    this.$chatList.next(this.chatList)
  }

  onViewingChatList(){
    this.viewingChatList = !this.viewingChatList
    if(this.viewingChatList){
    }
    this.sendViewingChatList()
  }

  sendViewingChatList(){
    this.$viewingChatList.next(this.viewingChatList)
  }

  onChatClickService(chat: IChat){
    this.chatViewing = chat;
    this.onViewingChat()
  }

  onViewingChat(){
    this.viewingChat = !this.viewingChat;
    this.$viewingChat.next(this.viewingChat)
  }
  setNotChat(){
    this.viewingChat = false;
    this.viewingChatList = false;
    this.viewingChatFromList = false;
    this.viewingNewChat = false;
    this.accountReceiving = null;
  }

  sendChatViewing(){
    this.$chatViewing.next(this.chatViewing)
  }

  messageClick(receiver: IAccount){
    this.accountReceiving = receiver
    this.onViewingChatFromList()
    if(this.account?.id) {
      this.http.getAccountsChats(this.account?.id).pipe(first()).subscribe({
        next: (chats) => {
          for (let chat of chats) {
            chat.messages.sort((message1: IMessage, message2: IMessage) => {
              const c = new Date(message1.createdDate);
              const d = new Date(message2.createdDate);
              return d.getTime() - c.getTime();
            });
          }
          chats.sort((chat1: IChat, chat2: IChat) => {
            const c = new Date(chat1.messages[chat1.messages.length - 1].createdDate);
            const d = new Date(chat2.messages[chat2.messages.length - 1].createdDate);
            return d.getTime() - c.getTime();
          });

          this.chatList = chats
          // this.sendAccountsChats()
          // let chatExist: number = 0;
          // for(let chat of this.chatList){
          //   for(let messenger of chat.messenger){
          //     if(messenger.id === receiver.id){
          //       this.chatViewing = chat
          //       return;
          //     }
          //   }
          // }
          if(this.chatList.find(chat => chat.messenger.find(account => account.id === receiver.id))){
            for(let chat of this.chatList){
              for(let messenger of chat.messenger){
                if(messenger.id === receiver.id){
                  this.chatViewing = chat
                  this.sendChatViewing()
                  return;
                }

              }
            }
          }else{
            this.onViewingNewChat()
          }
          this.onMessaging()

        },
        error: (err) => {
          alert("There was a server error while trying to retrieve chats. Please try again later.")
          // console.error(err)
        }
      })
    }
    // let chatExist: number = 0;
    // for(let chat of this.chatList){
    //   for(let messenger of chat.messenger){
    //     if(messenger.id === receiver.id){
    //       this.chatViewing = chat
    //       return;
    //     }
    //   }
    // }
    // console.log("through")
  }
  //sending account receiving
  onMessaging(){
    if(this.accountReceiving) {
      this.$accountReceiving.next(this.accountReceiving);
    }
  }

  //Toggle if viewing a new chat
  onViewingNewChat(){
    this.viewingNewChat = !this.viewingNewChat;
    this.sendViewingNewChat()
  }
  sendViewingNewChat(){
    this.$viewingNewChat.next(this.viewingNewChat)
  }


  //Toggle account-list to viewing chat
  onViewingChatFromList(){
    this.viewingChatFromList = !this.viewingChatFromList
    if(!this.viewingChatFromList){
      this.accountReceiving = null;
      this.viewingNewChat = false;
    }
    this.sendViewingChatFromList()
  }
  sendViewingChatFromList(){
    this.$viewingChatFromList.next(this.viewingChatFromList)
  }

  createChat(receiverID: number, messageText: string, messengerID: number){
    this.onViewingNewChat()
    let checkForChat: boolean = false;
    if(this.account?.id) {
      this.http.getAccountsChats(this.account?.id).pipe(first()).subscribe({
        next: (chats) => {
          // if(chats.find(chat => chat.messenger.find(account => account.id === receiverID))){
            for(let chat of chats){
              for(let messenger of chat.messenger){
                if(messenger.id === receiverID){
                  checkForChat = true;
                  if(chat.id) {
                    this.updateChat(chat.id, messageText, messengerID)
                  }
                }
              }
            }
          if(!checkForChat){
            this.http.createChat(receiverID, messageText, messengerID).pipe(first()).subscribe({
              next: (chat) => {
                this.chatViewing = chat
                this.sendChatViewing()
              },
              error: (err) => {
                alert("There was a server error while trying to create chat. Please try again later.")
                // console.error(err)
              }
            })
          }

        },
        error: (err) => {
          alert("There was a server error while trying to get chats. Please try again later.")
          // console.error(err)
        }
      })
    }

    // if(!checkForChat){
    //   this.http.createChat(receiverID, messageText, messengerID).pipe(first()).subscribe({
    //     next: (chat) => {
    //       this.chatViewing = chat
    //       this.sendChatViewing()
    //     },
    //     error: (err) => {
    //       alert("There was a server error while trying to create chat. Please try again later.")
    //       // console.error(err)
    //     }
    //   })
    // }
  }



}
