import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { DataStoreService } from '../data-store.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('formdata') SignUpForm: NgForm;
  email: any;
  password: any;


  constructor(private route: Router, public services: DataStoreService ) { }
  ngOnInit() {
    if(this.services.iscatch() ){
      this.route.navigate(['/posts']);
    }
  }
  onClickSubmit() {
    this.services.signupUser( this.SignUpForm.value.email, this.SignUpForm.value.password);
  }

}
