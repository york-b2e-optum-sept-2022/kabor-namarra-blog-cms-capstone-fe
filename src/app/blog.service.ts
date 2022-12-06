import { Injectable } from '@angular/core';
import {IBlog} from "./interfaces/IBlog";
import {first, Subject} from "rxjs";
import {HttpService} from "./http.service";

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

  constructor(public http: HttpService) { }


  getBlogs(){
    this.http.getBlogs().pipe(first()).subscribe({
      next: (blogs) => {
        this.blogList = blogs;
        this.$blogList.next(this.blogList);
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
    this.$viewingBlog.next(this.viewingBlog)
  }

  getBlogViewed(){
    this.$blogViewed.next(this.blogViewed);
  }
}
