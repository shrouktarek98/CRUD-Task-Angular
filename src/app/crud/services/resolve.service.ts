import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResolveService implements Resolve<any>{

  constructor(private httpClient: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot) {
    console.log('jjjj');
    return this.httpClient.get(environment.url);

  }
}
