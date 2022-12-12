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
    if(this.account.username === "" || this.account.password === "") {
      alert("You must fill in the username and the password field to register.")
    }
    if(this.account.username !== "" && this.account.password !== "") {
      this.accountService.onRegister(this.account)
    }
  }

}
