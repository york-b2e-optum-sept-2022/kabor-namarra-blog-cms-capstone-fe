import {Component, Input} from '@angular/core';
import {IBlog} from "../../interfaces/IBlog";
import {BlogService} from "../../blog.service";
import {AccountService} from "../../account.service";

@Component({
  selector: 'app-blog-display',
  templateUrl: './blog-display.component.html',
  styleUrls: ['./blog-display.component.css']
})
export class BlogDisplayComponent {

  @Input() blogDisplay!: IBlog;

  constructor(public blogService: BlogService, public accountService: AccountService) {
  }

  onBlogDisplayClick(){
    if(this.blogDisplay.id) {
      this.blogService.openBlog(this.blogDisplay.id)
    }
    this.accountService.setViewingProfile()
  }

  onUserClick(){
    if(this.blogDisplay.author.id) {
      this.accountService.onViewingProfile(this.blogDisplay.author.id)
    }
  }

}
