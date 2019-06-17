import { Component, OnInit } from '@angular/core';
import { DataStoreService } from './../data-store.service';
import { Router, NavigationEnd } from '@angular/router';
import { async } from '@angular/core/testing';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { CrudService } from './../crud.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  title: any;
  description: any;
  posts:Array<{id:string,title:string,body:string}>;
  edit_id: any;
  edit_title: any;
  edit_description: any;
  post: {id:string,title:string,body:string}={id:'',title:'',body:''};
  id:any;
  keyword: string;
  search:string;
  constructor(public http:HttpClient ,private route:Router, public services:DataStoreService, public crudServe: CrudService) {
  
      if(!this.services.iscatch() ) {
        this.route.navigate(['/Signin']);
     
      }
      else{
        if(localStorage.getItem('user')==='"doneadmin"'){
          this.services.admin=true;
        }
        else{
          this.services.admin=false;
        }
      }
   }
  ngOnInit() {
     this.crudServe.get_posts().subscribe((res: any) => {
      this.posts = res;
    });
  }
  
  create_posts(request) {
    this.crudServe.create_post(request);
  }
  update_Post(id){
    this.posts.forEach(element => {
      if(id == element.id){
        this.post= element;
      }
    });

  }
  UpdatePost(request){
    this.crudServe.updatePost(request);
  }
  deletePost(request){
    this.posts.forEach(element => {
      if(request == element.id){
        this.post= element;
      }
    });
  }
  Delete_Post(request){
    console.log(request);
    this.crudServe.deletePost(request.id);
    this.route.navigate(['/posts']);
  }


}
