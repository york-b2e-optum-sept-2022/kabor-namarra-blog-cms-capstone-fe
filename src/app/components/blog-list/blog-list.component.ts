import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogService} from "../../blog.service";
import {IBlog} from "../../interfaces/IBlog";
import {Subject, takeUntil} from "rxjs";
import {AccountService} from "../../account.service";
import {IAccount} from "../../interfaces/IAccount";

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy{

  blogList: IBlog[] = [];
  account: IAccount| null = null;
  searchText: string = "";

  onDestroy = new Subject();

  constructor(public blogService: BlogService, public accountService: AccountService) {
    this.blogService.$blogList.pipe(takeUntil(this.onDestroy)).subscribe( blogList => {
      this.blogList = blogList;
    })
    this.accountService.$userAccount.pipe(takeUntil(this.onDestroy)).subscribe(account =>{
      this.account = account;
    })
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  ngOnInit() {
    this.accountService.sendAccount();
    this.blogService.getBlogs()
  }

  onSearchTextChange(text:string){
    this.blogService.blogListSearch(text);
  }

  onCreateBlog(){
    this.blogService.onStartCreatingBlog()
  }

}
