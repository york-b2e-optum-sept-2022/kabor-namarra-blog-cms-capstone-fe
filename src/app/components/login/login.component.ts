import { Component } from '@angular/core';
import {AccountService} from "../../account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = "";
  password: string = "";

  constructor(public accountService: AccountService) {
  }

  onRegisterClick(){
    this.accountService.onRegisterClickService();
  }

  onLoginClick(){
    this.accountService.onLogin(this.username,this.password);
  }
  onBackClick(){
    this.accountService.onLoginClickService();
  }

}
