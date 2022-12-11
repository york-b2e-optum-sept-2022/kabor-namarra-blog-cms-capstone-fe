import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {FormsModule} from "@angular/forms";
import { HomepageComponent } from './components/homepage/homepage.component';
import {HttpClientModule} from "@angular/common/http";
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogDisplayComponent } from './components/blog-display/blog-display.component';
import { CommentComponent } from './components/comment/comment.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';
import { AccountDisplayComponent } from './components/account-display/account-display.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/message/message.component';
import { ChatDisplayComponent } from './components/chat-display/chat-display.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomepageComponent,
    BlogListComponent,
    BlogComponent,
    BlogDisplayComponent,
    CommentComponent,
    CreateBlogComponent,
    AccountsListComponent,
    AccountDisplayComponent,
    ChatListComponent,
    ChatComponent,
    MessageComponent,
    ChatDisplayComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatGridListModule,
        MatSidenavModule,
        MatButtonModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
