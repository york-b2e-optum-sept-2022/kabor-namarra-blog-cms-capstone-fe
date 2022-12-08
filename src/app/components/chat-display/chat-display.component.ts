import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IChat} from "../../interfaces/IChat";
import {AccountService} from "../../account.service";
import {Subject, takeUntil} from "rxjs";
import {IAccount} from "../../interfaces/IAccount";
import {ChatService} from "../../chat.service";

@Component({
  selector: 'app-chat-display',
  templateUrl: './chat-display.component.html',
  styleUrls: ['./chat-display.component.css']
})
export class ChatDisplayComponent implements OnInit, OnDestroy{

  @Input() chat!: IChat;
  @Input() account: IAccount|null = null;

  onDestroy = new Subject();

  constructor(public chatService: ChatService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onChatClick(){
    this.chatService.onChatClickService(this.chat)
  }

}
