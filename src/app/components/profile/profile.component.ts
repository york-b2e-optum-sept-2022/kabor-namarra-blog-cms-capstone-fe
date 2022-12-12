import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAccount} from "../../interfaces/IAccount";
import {AccountService} from "../../account.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy{

  accountViewing!: IAccount;
  onDestroy = new Subject();

  constructor(public accountService: AccountService) {
    this.accountService.$accountViewing.pipe(takeUntil(this.onDestroy)).subscribe(account =>{
      this.accountViewing = account;
    })
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  ngOnInit() {
    this.accountService.sendAccountViewing();
  }

  onBackClick(){
    this.accountService.setViewingProfile();
  }

}
