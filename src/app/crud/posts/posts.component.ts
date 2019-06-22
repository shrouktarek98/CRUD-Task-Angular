import { Component, OnInit, ViewChild } from '@angular/core';
import { DataStoreService } from './../../data-store/data-store.service';
import { Router } from '@angular/router';
import { CrudService } from './../crud.service';
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @ViewChild('create') FormCreate: NgForm;
  posts:Array<{id:string,title:string,body:string}>;
  edit_id: any;
  edit_title: any;
  edit_description: any;
  post: {id: string, title: string, body: string} = {id: '', title: '', body: ''};
  postsFile: Array<{id: string, title: string, body: string}> ;
  id: any;
  search: string;
  resetFile: any;
  arrayBuffer: any;
  file: File;
  count: number = 0;
  public url= "https://jsonplaceholder.typicode.com/posts" ;


  constructor(public http: HttpClient , private route:Router, public services: DataStoreService, public crudServe: CrudService) {

      if(!this.services.iscatch() ) {
        this.route.navigate(['/Signin']);
      }
      else {
        if(localStorage.getItem('user') === '"doneadmin"') {
          this.services.admin = true;
        }
        else {
          this.services.admin = false;
        }
      }
  }
  ngOnInit() {
    this.crudServe.get_posts().subscribe((res: any) => {
     this.posts = res;
   });
 }
  exportAsXLSX():void {
    this.crudServe.exportAsExcelFile(this.posts, 'sample');
  }
  incomingfile(event){
    this.file = event.target.files[0];
  }

  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        let data = new Uint8Array(this.arrayBuffer);
        let arr = new Array();
        for ( let i = 0 ; i != data.length; ++i) {arr[i] = String.fromCharCode(data[i]); }
        let bstr = arr.join('');
        let workbook = XLSX.read(bstr, {type: "binary" });
        let first_sheet_name = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[first_sheet_name];
        this.postsFile = XLSX.utils.sheet_to_json(worksheet, { raw: true })
        for (let index = 0; index < this.postsFile.length; index++) {
          const element = this.postsFile[index];
          this.create_posts(element);
        }
    }
    fileReader.readAsArrayBuffer(this.file);
    this.resetFile= '';
  }


  create_posts(request) {
    this.http.post(this.url, JSON.stringify(request))
      .subscribe((response:any) =>{
          request.id=response.id+this.count;
          this.count++;
          this.posts.splice(0,0,request);
      }
    );
    this.FormCreate.reset();
  }
  update_Post(id) {
    this.posts.forEach(element => {
      if(id == element.id){
        this.post = element;
      }
    });

  }
  UpdatePost(request){
    this.http.patch(this.url+'/'+this.post.id,this.post)
    .subscribe(response=>{
      this.posts.forEach(element => {
        if(request.id === element.id){
          element.title = request.title;
          element.body = request.body;
        }
      });
    })

  }
  deletePost(request){
    this.posts.forEach(element => {
      if(request == element.id){
        this.post= element;
      }
    });
  }
  Delete_Post(){
    console.log(this.post);
    this.http.delete(this.url+'/'+this.post.id)
     .subscribe(response=>{
       let index = this.posts.indexOf(this.post);
       this.posts.splice(index,1);
     })
  }


}
