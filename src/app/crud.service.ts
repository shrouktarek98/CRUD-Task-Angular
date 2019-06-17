import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
  
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient,private router:Router) { }

  public url=" http://localhost:3000/posts";
  get_posts(){
    return this.http.get(this.url);
  }
  create_post(data) {
    this.http.post(this.url,data).subscribe(response => {  
      this.router.navigate(['/Signin']); 
    }); 
  }
  updatePost(post){
    
    console.log(post);
    this.http.put(this.url + '/' + post.id, post)  
    .subscribe(response => {  
      this.router.navigate(['/posts']);
    }); 
  }
  deletePost(post){
    this.http.delete(this.url+'/'+post).subscribe(response => {  
      this.router.navigate(['/Signin']);
    }); 
  }
}
