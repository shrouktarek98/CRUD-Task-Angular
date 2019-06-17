import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DataStoreService } from './data-store.service';

import { PostsComponent } from './posts/posts.component';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from '@angular/fire';
// import { environment } from './../environments/environment';

import { AngularFireDatabase, AngularFireList, AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import { CrudService } from './crud.service';
import { HeaderComponent } from './header/header.component';
import { SearchPostPipe } from './search-post.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    PostsComponent,
    HeaderComponent,
    SearchPostPipe,
    
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    
  ],
  providers: [DataStoreService, CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
