import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { DataStoreService } from '../data-store.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  SignUpForm: FormGroup;

  constructor(private route: Router, public services: DataStoreService ) { }
  ngOnInit() {
    if (this.services.isCatch() ) {
      this.route.navigate(['/posts']);
    }
    this.SignUpForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }
  onClickSubmit() {
    this.services.signUpUser( this.SignUpForm.value.email, this.SignUpForm.value.password);
  }

}
