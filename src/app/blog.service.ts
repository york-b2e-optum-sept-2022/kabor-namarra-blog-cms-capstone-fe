import { Injectable } from '@angular/core';
import {IBlog} from "./interfaces/IBlog";
import {first, Subject} from "rxjs";
import {HttpService} from "./http.service";
import {IComment} from "./interfaces/IComment";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private blogList: IBlog[] = [];
  private viewingBlog: boolean = false;
  private blogViewed!: IBlog;

  $blogList = new Subject<IBlog[]>();
  $viewingBlog = new Subject<boolean>();
  $blogViewed = new Subject<IBlog>();
  $creatingBlog = new Subject<boolean>();

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
        console.error(err)
      }
    })
  }
  createBlog(title: string, body:string, authorID: number){
    this.http.createBlog(title, body, authorID).pipe(first()).subscribe({
      next: (blog) => {
        console.log(blog)
        this.onCreatingBlog()
      },
      error: (err) => {
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
        console.error(err)
      }
    })
  }

  openBlog(blogId: number){
    const blog = this.blogList.find(blog => blog.id === blogId);
    if(blog){
      this.blogViewed = blog;
    }
    this.onViewBlog()
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

  onCreatingBlog(){
    this.$creatingBlog.next(false);
  }
}
