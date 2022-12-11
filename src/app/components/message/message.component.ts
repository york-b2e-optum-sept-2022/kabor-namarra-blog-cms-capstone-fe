import {Component, Input} from '@angular/core';
import {IMessage} from "../../interfaces/IMessage";
import {IAccount} from "../../interfaces/IAccount";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  @Input() message!: IMessage;
  @Input() account: IAccount | null = null;

}
