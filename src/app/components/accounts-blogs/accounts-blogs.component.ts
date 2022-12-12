import { Component } from '@angular/core';
import {IBlog} from "../../interfaces/IBlog";
import {IAccount} from "../../interfaces/IAccount";
import {Subject, takeUntil} from "rxjs";
import {BlogService} from "../../blog.service";
import {AccountService} from "../../account.service";

@Component({
  selector: 'app-accounts-blogs',
  templateUrl: './accounts-blogs.component.html',
  styleUrls: ['./accounts-blogs.component.css']
})
export class AccountsBlogsComponent {


  blogList: IBlog[] = [];
  searchText: string = "";

  onDestroy = new Subject();

  constructor(public blogService: BlogService, public accountService: AccountService) {
    this.blogService.$accountsBlogs.pipe(takeUntil(this.onDestroy)).subscribe( blogList => {
      this.blogList = blogList;
    })
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  ngOnInit() {
    this.blogService.getAccountsBlogs()
    // this.blogService.getBlogs()
  }

  onSearchTextChange(text:string){
    this.blogService.blogAccountListSearch(text);
  }


}
