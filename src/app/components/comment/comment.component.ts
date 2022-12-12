import {Component, Input} from '@angular/core';
import {BlogService} from "../../blog.service";
import {IComment} from "../../interfaces/IComment";
import {IAccount} from "../../interfaces/IAccount";
import {AccountService} from "../../account.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  @Input() comment!: IComment;
  @Input() account: IAccount|null = null;
  editingComment: boolean = false;
  deleteCheck: boolean = false;

  constructor(public blogService: BlogService, public accountService: AccountService) {
  }

  onEditClick(){
    this.editingComment = !this.editingComment
  }

  onSaveClick(){
    this.comment.updatedDate = new Date()
    this.blogService.updateComment(this.comment)
    this.onEditClick();
  }

  onDeleteCheck(){
    this.deleteCheck = !this.deleteCheck
  }

  onDeleteClick(){
    if(this.comment.id) {
      this.blogService.deleteComment(this.comment.id)
    }
  }

  onUserClick(){
    if(this.comment.author.id) {
      this.accountService.onViewingProfile(this.comment.author.id)
    }
  }

}
