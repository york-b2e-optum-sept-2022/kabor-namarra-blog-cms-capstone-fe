import { Injectable } from '@angular/core';
import {IBlog} from "./interfaces/IBlog";
import {first, Subject} from "rxjs";
import {HttpService} from "./http.service";
import {IComment} from "./interfaces/IComment";
import {IAccount} from "./interfaces/IAccount";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private blogList: IBlog[] = [];
  private viewingBlog: boolean = false;
  private blogViewed!: IBlog;
  private accountViewingID!: number;
  private accountsBlogs: IBlog[] = [];

  $blogList = new Subject<IBlog[]>();
  $viewingBlog = new Subject<boolean>();
  $blogViewed = new Subject<IBlog>();
  $creatingBlog = new Subject<boolean>();
  $accountsBlogs = new Subject<IBlog[]>();

  $addComment = new Subject<IComment>();
  $deleteComment = new Subject<number>();

  constructor(public http: HttpService) { }


  getBlogs(){
    this.http.getBlogs().pipe(first()).subscribe({
      next: (blogs) => {
        blogs.sort((blog1:IBlog, blog2:IBlog) => {
          const c = new Date(blog1.createdDate);
          const d = new Date(blog2.createdDate);
          return d.getTime() - c.getTime();
        });
        for(let blog of blogs){
          blog.comments.sort((comment1:IComment, comment2:IComment) => {
            const c = new Date(comment1.createdDate);
            const d = new Date(comment2.createdDate);
            return d.getTime() - c.getTime();
          });
        }
        this.blogList = blogs;
        this.$blogList.next(this.blogList);
      },
      error: (err) => {
        alert("There was a server error while trying to retrieve blogs. Please try again later.")
        console.error(err)
      }
    })
  }
  createBlog(title: string, body:string, authorID: number){
    this.http.createBlog(title, body, authorID).pipe(first()).subscribe({
      next: (blog) => {
        console.log(blog)
        this.onDoneCreatingBlog()
      },
      error: (err) => {
        alert("There was a server error while trying to create blog. Please try again later.")
        console.error(err)
      }
    })
  }

  updateBlog(blog: IBlog){
    this.http.updateBlog(blog).pipe(first()).subscribe({
      next: (blog) => {
        blog.comments.sort((comment1:IComment, comment2:IComment) => {
          const c = new Date(comment1.createdDate);
          const d = new Date(comment2.createdDate);
          return d.getTime() - c.getTime();
        });
        this.blogViewed = blog
        this.getBlogViewed()
        this.getBlogs()
      },
      error: (err) => {
        alert("There was a server error while trying to update blog. Please try again later.")
        console.error(err)
      }
    })
  }
  deleteBlog(blogID: number){
    this.http.deleteBlog(blogID).pipe(first()).subscribe({
      next: (blog) => {
        this.onViewBlog()
      },
      error: (err) => {
        alert("There was a server error while trying to delete blog. Please try again later.")
        console.error(err)
      }
    })
  }

  createComment(body:string,authorID: number, blogID: number){
    this.http.createComment(body, authorID, blogID).pipe(first()).subscribe({
      next: (comment) => {
        console.log(comment)
        this.blogViewed.comments.splice(0,0,comment);
        this.getBlogViewed()
      },
      error: (err) => {
        alert("There was a server error while trying to create comment. Blog might have been deleted. Please refresh page or go to the home screen.")
        console.error(err)
      }
    })
  }

  updateComment(comment: IComment){
    this.http.updateComment(comment).pipe(first()).subscribe({
      next: (comment) => {
        console.log(comment)
        this.blogViewed.comments.splice(this.blogViewed.comments.findIndex(element => element.id === comment.id),1,comment);
      },
      error: (err) => {
        alert("There was a server error while trying to update comment. Blog might have been deleted. Please refresh page or go to the home screen.")
        console.error(err)
      }
    })
  }

  deleteComment(commentID: number){
    this.http.deleteComment(commentID).pipe(first()).subscribe({
      next: (comment) => {
        this.blogViewed.comments.splice(this.blogViewed.comments.findIndex(element => element.id === commentID),1);
        this.getBlogViewed()
      },
      error: (err) => {
        alert("There was a server error while trying to delete comment. Blog might have been deleted. Please refresh page or go to the home screen.")
        console.error(err)
      }
    })
  }



  //Blog viewing
  openBlog(blogId: number){
    const blog = this.blogList.find(blog => blog.id === blogId);
    if(blog){
      this.blogViewed = blog;
    }
    this.onViewBlog()
  }
  setViewingBlog(viewing: boolean){
    this.viewingBlog = viewing;
    this.sendIfViewingBlog()
  }
  onViewBlog(){
    this.viewingBlog = !this.viewingBlog
    this.sendIfViewingBlog()
  }
  sendIfViewingBlog(){
    this.$viewingBlog.next(this.viewingBlog)
  }
  getBlogViewed(){
    this.$blogViewed.next(this.blogViewed);
  }






  onDoneCreatingBlog(){
    this.$creatingBlog.next(false);
  }
  onStartCreatingBlog(){
    this.$creatingBlog.next(true);
  }

  blogListSearch(text:string){
    this.$blogList.next(this.blogList.filter(blog => blog.title.toUpperCase().includes(text.toUpperCase())))
  }
  blogAccountListSearch(text:string){
    this.$accountsBlogs.next(this.accountsBlogs.filter(blog => blog.title.toUpperCase().includes(text.toUpperCase())))
  }

  setAccountViewing(account: number){
    this.accountViewingID = account
  }

  getAccountsBlogs(){
    this.accountsBlogs = this.blogList.filter(blogs => blogs.author.id === this.accountViewingID)
    this.$accountsBlogs.next(this.accountsBlogs)
  }
}
