import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DataStoreService } from './../../data-store/data-store.service';
import { Router } from '@angular/router';
import { CrudService } from './../services/crud.service';
import { ExcelService } from './../services/excel.service';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from './../../services/alert.service';
import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';


export class Post {
  id: string;
  title: string;
  body: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  createForm: FormGroup;
  posts: Array<Post>;
  post = {id: '', title: '', body: ''};
  postsFile: Array<Post> ;
  search: string;
  resetFile: any;
  arrayBuffer: any;
  file: File;
  count = 0;
  number = 0;


  constructor(public http: HttpClient , private route:Router,
     public dataStoreService: DataStoreService, public crudServe: CrudService,
     public excelService: ExcelService, public alertService:  AlertService,
     private activatedRoute: ActivatedRoute) {

      if (!this.dataStoreService.isCatch() ) {
        this.route.navigate(['/signIn']);
      } else {
        if (localStorage.getItem('user') === '"doneAdmin"') {
          this.dataStoreService.admin = true;
        } else {
          this.dataStoreService.admin = false;
        }
      }
  }

  ngOnInit() {
    // this.posts = this.activatedRoute.snapshot.data['posts'];
    this.crudServe.get_posts().subscribe((res: any) => {
     this.posts = res;
     this.alertService.success('Welcome');
    }, _error => {
      this.alertService.error('Error Unexpected!');
    });

    this.createForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'body': new FormControl(null, [Validators.required]),
    });
  }


  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.posts, 'sample');
  }
  inComingFile(event){
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
        let workBook = XLSX.read(bstr, {type: 'binary' });
        let firstSheetName = workBook.SheetNames[0];
        let workSheet = workBook.Sheets[firstSheetName];
        this.postsFile = XLSX.utils.sheet_to_json(workSheet, { raw: true } );
        for (let index = 0; index < this.postsFile.length; index++) {
          const element = this.postsFile[index];
          this.createPost(element);
        }
    };
    fileReader.readAsArrayBuffer(this.file);
    this.resetFile = '';
  }


  createPost(request) {
    this.crudServe.createPost(request).subscribe((res: any) => {
      request.id = res.id + this.count;
      this.count++;
      this.posts.splice(0, 0, request);
      this.alertService.success('Success Create');
    });
    this.createForm.reset();
  }

  updatePostForm(request) {
    this.post = request;
  }
  UpdatePost(request) {
    this.crudServe.updatePost(request).subscribe((res: any) => {
      this.posts.forEach(element => {
        if (request.id === element.id) {
          element.title = request.title;
          element.body = request.body;
          this.alertService.success('Success Update Post!');
        }
      });
    }, _error => {
      this.alertService.error('Error Unexpected!');
    });
  }

  deletePostForm(request) {
    this.post = request;
  }
  deletePost() {
    this.crudServe.deletePost(this.post).subscribe((res: any) => {
      let index = this.posts.indexOf(this.post);
      this.posts.splice(index,1);
      this.alertService.success('Success Delete Post!');
    }, _error => {
      this.alertService.error('Error Unexpected!');
    });
  }


}
