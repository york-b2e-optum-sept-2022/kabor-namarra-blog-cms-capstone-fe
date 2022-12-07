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
    CreateBlogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
