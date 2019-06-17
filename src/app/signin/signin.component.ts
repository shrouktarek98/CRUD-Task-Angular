import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataStoreService } from '../data-store.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email: any;
  password: any;
  constructor(private route: Router, public services: DataStoreService) { }

  ngOnInit() {
    if(this.services.iscatch() ){
      this.route.navigate(['/posts']);
    }
  }
  onClickSubmit(date){
    this.services.signinUser(date.email, date.password);
  }
  loginwithgoogle(){
    this.services.loginWithGoogle();
  }

}
