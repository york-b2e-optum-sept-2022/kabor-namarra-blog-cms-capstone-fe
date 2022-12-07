import {Component, OnInit} from '@angular/core';
import {IBlog} from "../../interfaces/IBlog";
import {IAccount} from "../../interfaces/IAccount";
import {BlogService} from "../../blog.service";
import {AccountService} from "../../account.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit{

  title: string = "";
  body: string = "";
  author: IAccount|null = null;
  onDestroy = new Subject();


  constructor(public blogService: BlogService, public accountService: AccountService) {
    this.accountService.$userAccount.pipe(takeUntil(this.onDestroy)).subscribe(account =>{
      this.author = account;
    })
  }

  ngOnInit() {
    this.accountService.sendAccount()
  }

  onCancelClick(){
    this.blogService.onCreatingBlog()
  }

  onCreateClick(){
    if(this.title !== "" && this.body !=="") {
      if (this.author?.id) {
        this.blogService.createBlog(this.title, this.body, this.author?.id)
      }
    }
  }


}
