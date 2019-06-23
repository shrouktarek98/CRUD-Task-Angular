import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router , Resolve} from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError, mergeMap } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AlertService } from './../../services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) { }


  get_posts() {
    return this.http.get(environment.url).pipe(
      map( (dataFromApi) => dataFromApi ),
      catchError( (err) => Observable.throw(err.json().error) )
    );
  }
  deletePost(post) {
    return this.http.delete(environment.url + '/' + post.id);
  }

  updatePost(post) {
    return this.http.patch(environment.url + '/' + post.id, post);
  }
  createPost(post) {
    return this.http.post(environment.url, JSON.stringify(post));
  }


}
