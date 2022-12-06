import {Component, OnDestroy, OnInit} from '@angular/core';
import {IBlog} from "../../interfaces/IBlog";
import {Subject, takeUntil} from "rxjs";
import {BlogService} from "../../blog.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy{

  blog!: IBlog;

  onDestroy = new Subject();

  constructor(public blogService: BlogService) {
    this.blogService.$blogViewed.pipe(takeUntil(this.onDestroy)).subscribe( blog =>{
      this.blog = blog;
    })
  }

  ngOnInit() {
    this.blogService.getBlogViewed()
  }
  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onBackClick(){
    this.blogService.onViewBlog();
  }

}
