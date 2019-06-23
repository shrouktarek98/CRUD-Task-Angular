import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { DataStoreService } from '../data-store.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  SignInForm: FormGroup;
  constructor(private route: Router, public services: DataStoreService) {}

  ngOnInit() {
    if (this.services.isCatch() ) {
      this.route.navigate(['/posts']);
    }
    this.SignInForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, [Validators.required]),
    });
  }

  onClickSubmit() {
    this.services.signInUser(this.SignInForm.value.email, this.SignInForm.value.password);
  }
  loginWithGoogle() {
    this.services.loginWithGoogle();
  }

}
