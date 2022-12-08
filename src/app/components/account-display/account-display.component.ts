import {Component, Input} from '@angular/core';
import {IAccount} from "../../interfaces/IAccount";

@Component({
  selector: 'app-account-display',
  templateUrl: './account-display.component.html',
  styleUrls: ['./account-display.component.css']
})
export class AccountDisplayComponent {

  @Input() account!: IAccount;

}
