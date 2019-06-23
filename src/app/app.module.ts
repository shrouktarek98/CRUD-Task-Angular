import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SigninComponent } from './data-store/signin/signin.component';
import { SignupComponent } from './data-store/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from './crud/posts/posts.component';

import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireList, AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import {NgxPaginationModule} from 'ngx-pagination';

import { CrudService } from './crud/services/crud.service';
import { DataStoreService } from './data-store/data-store.service';
import { ExcelService } from './crud/services/excel.service';
import { AlertService } from './services/alert.service';



import { SearchPostPipe } from './crud/pipes/search-post.pipe';


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
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [DataStoreService, CrudService, ExcelService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
