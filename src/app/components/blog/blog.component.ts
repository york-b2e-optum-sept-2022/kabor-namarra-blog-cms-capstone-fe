import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IBlog} from "../../interfaces/IBlog";
import {Subject, takeUntil} from "rxjs";
import {BlogService} from "../../blog.service";
import {AccountService} from "../../account.service";
import {IAccount} from "../../interfaces/IAccount";
import {IComment} from "../../interfaces/IComment";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy{

  blog!: IBlog;
  commentInput: string = "";
  errorDisplay: string = "";
  account: IAccount|null = null;

  editing: boolean = false;
  deleteCheck: boolean = false;


  onDestroy = new Subject();

  constructor(public blogService: BlogService, public accountService: AccountService) {
    this.blogService.$blogViewed.pipe(takeUntil(this.onDestroy)).subscribe( blog =>{
       blog.comments.sort((comment1:IComment, comment2:IComment) => {
        const c = new Date(comment1.createdDate);
        const d = new Date(comment2.createdDate);
        return d.getTime() - c.getTime();
      });
      this.blog = blog;
    })
    this.accountService.$userAccount.pipe(takeUntil(this.onDestroy)).subscribe( account =>{
      this.account = account;
      if(account === null){
        this.editing = false;
      }
    })
  }

  ngOnInit() {
    this.accountService.sendAccount();
    this.blogService.getBlogViewed()
  }
  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onBackClick(){
    this.blogService.onViewBlog();
  }

  onCommentClick(){
    if(this.commentInput === ""){
      this.errorDisplay = "Must enter text"
      return;
    }
    if(this.account?.id && this.blog.id) {
      this.blogService.createComment(this.commentInput, this.account.id, this.blog.id)
    }
    this.commentInput = "";
  }

  onEditClick(){
    this.editing = !this.editing
  }

  onSaveClick(){
    this.onEditClick()
    this.blogService.updateBlog(this.blog)
  }
  onDeleteCheck(){
    this.deleteCheck = !this.deleteCheck
  }

  onDeleteClick(){
    if(this.blog.id) {
      this.blogService.deleteBlog(this.blog.id)
    }
  }

}
