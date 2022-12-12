import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "../../account.service";
import {IAccount} from "../../interfaces/IAccount";
import {Subject, takeUntil} from "rxjs";
import {BlogService} from "../../blog.service";
import {ChatService} from "../../chat.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy{

  account: IAccount|null = null;
  viewingBlog: boolean = false;
  creatingBlog: boolean = false;
  viewUsers: boolean = false;
  viewingChats: boolean = false;
  viewingProfile: boolean = false;

  onDestroy = new Subject();

  constructor(public accountService: AccountService, public blogService: BlogService, public chatService: ChatService) {
    this.accountService.$userAccount.pipe(takeUntil(this.onDestroy)).subscribe(account =>{
      this.account = account;
      if(account === null){
        this.onSignOut()
      }
    })
    this.blogService.$viewingBlog.pipe(takeUntil(this.onDestroy)).subscribe(viewing =>{
      this.viewingBlog = viewing;
    })
    this.blogService.$creatingBlog.pipe(takeUntil(this.onDestroy)).subscribe(creating =>{
      this.creatingBlog = creating;
    })
    this.accountService.$viewingAccountList.pipe(takeUntil(this.onDestroy)).subscribe(viewing =>{
      this.viewUsers = viewing;
    })
    this.chatService.$viewingChatList.pipe(takeUntil(this.onDestroy)).subscribe(viewing =>{
      this.viewingChats = viewing;
    })
    this.accountService.$viewingProfile.pipe(takeUntil(this.onDestroy)).subscribe(viewing =>{
      if(viewing){
        this.whenViewProfile()
      }
      this.viewingProfile = viewing;
    })
  }
  ngOnInit() {
    this.accountService.sendViewingUsers()
    this.blogService.sendIfViewingBlog()
    this.accountService.sendAccount();
    this.accountService.getAllAccounts()
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onLoginClick(){
    this.accountService.onLoginClickService();
  }

  onLogoutClick(){
    this.accountService.onLogoutClick();
  }

  onCreateBlogClick(){
    if(this.viewingBlog){

      this.viewingBlog = false;
      this.blogService.setViewingBlog(false)
    }
    if(this.viewingChats){
      this.viewingChats = false;
      this.chatService.setNotChat()
    }
    if(this.viewUsers){
      this.viewUsers =false;
      this.accountService.setViewingUsers()
      this.chatService.setNotChat()
    }
    if(this.viewingProfile){
      this.viewingProfile = false;
      this.accountService.setViewingProfile()
    }
    this.creatingBlog = !this.creatingBlog

  }

  onUsersClick(){
    if(this.viewingBlog){
      this.viewingBlog = false;
      this.blogService.setViewingBlog(false)
    }
    if(this.creatingBlog){
      this.creatingBlog = false;
    }

    if(this.viewingChats){
      this.viewingChats = false;
      this.chatService.setNotChat()
    }
    if(this.viewingProfile){
      this.viewingProfile = false;
      this.accountService.setViewingProfile()
    }
    this.accountService.viewingUsers();

  }

  onChatsClick(){
    if(this.viewingBlog){
      this.viewingBlog = false;
      this.blogService.setViewingBlog(false)
    }
    if(this.creatingBlog){
      this.creatingBlog = false;
    }
    if(this.viewUsers){
      this.viewUsers =false;
      this.accountService.setViewingUsers()
      this.chatService.setNotChat()
    }
    if(this.viewingProfile){
      this.viewingProfile = false;
      this.accountService.setViewingProfile()
    }
    this.chatService.onViewingChatList();
  }

  onViewProfile(){
    // this.whenViewProfile()
    if(this.account?.id){
      this.accountService.onViewingProfile(this.account?.id);
    }
  }

  whenViewProfile(){
    if(this.viewingBlog){
      this.viewingBlog = false;
      this.blogService.setViewingBlog(false)
    }
    if(this.creatingBlog){
      this.creatingBlog = false;
    }
    if(this.viewingChats){
      this.viewingChats = false;
      this.chatService.setNotChat()
    }
    if(this.viewUsers){
      this.viewUsers =false;
      this.accountService.setViewingUsers()
      this.chatService.setNotChat()
    }
  }

  onHomeClick(){
    if(this.viewingBlog){
      this.viewingBlog = false;
      this.blogService.setViewingBlog(false)
    }
    if(this.creatingBlog){
      this.creatingBlog = false;
    }
    if(this.viewingChats){
      this.viewingChats = false;
      this.chatService.setNotChat()
    }
    if(this.viewUsers){
      this.viewUsers =false;
      this.accountService.setViewingUsers()
      this.chatService.setNotChat()
    }
    if(this.viewingProfile){
      this.viewingProfile = false;
      this.accountService.setViewingProfile()
    }
  }

  onSignOut(){
    // if(this.viewingBlog){
    //   this.blogService.setViewingBlog(false)
    // }
    if(this.creatingBlog){
      this.creatingBlog = false;
    }
    if(this.viewingChats){
      this.viewingChats = false;
      this.chatService.setNotChat()
    }
    // if(this.viewUsers){
    //   this.accountService.setViewingUsers()
    //   this.chatService.setNotChat()
    // }
    if(this.viewingProfile){
      this.viewingProfile = false;
      this.accountService.setViewingProfile()
    }
  }

}
