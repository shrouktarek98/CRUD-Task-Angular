import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { DataStoreService } from '../data-store.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('formdata') SignInForm: NgForm;
  constructor(private route: Router, public services: DataStoreService) { }

  ngOnInit() {
    if(this.services.iscatch() ){
      this.route.navigate(['/posts']);
    }
  }
  onClickSubmit(){
    this.services.signinUser(this.SignInForm.value.email, this.SignInForm.value.password);
  }
  loginwithgoogle(){
    this.services.loginWithGoogle();
  }

}
