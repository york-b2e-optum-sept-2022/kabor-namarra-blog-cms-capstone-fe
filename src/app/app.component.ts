import { Component } from '@angular/core';
import {AccountService} from "./account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kabor-namarra-blog-cms-capstone-fe';

  loggingIn: boolean = false;
  registering: boolean = false;

  constructor(public accountService: AccountService) {
    this.accountService.$loggingIn.subscribe(logging => {
      this.loggingIn = logging
    })
    this.accountService.$registering.subscribe(registering => {
      this.registering = registering
    })
  }

}
