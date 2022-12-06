import { Component } from '@angular/core';
import {IAccount} from "../../interfaces/IAccount";
import {AccountService} from "../../account.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  account: IAccount = {username:"",password:"",firstname:"",lastname:""};

  constructor(public accountService: AccountService) {
  }

  onBackClick(){
    this.accountService.onRegisterClickService();
  }

  onRegisterClick(){
    this.accountService.onRegister(this.account)
  }

}
