import {Component, OnDestroy, OnInit} from '@angular/core';
import {BlogService} from "../../blog.service";
import {IBlog} from "../../interfaces/IBlog";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy{

  blogList: IBlog[] = [];

  onDestroy = new Subject();

  constructor(public blogService: BlogService) {
    this.blogService.$blogList.pipe(takeUntil(this.onDestroy)).subscribe( blogList => {
      this.blogList = blogList;
    })
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  ngOnInit() {
    this.blogService.getBlogs()
  }

}
