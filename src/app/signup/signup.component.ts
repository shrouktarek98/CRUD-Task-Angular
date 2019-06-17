import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataStoreService } from '../data-store.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: any;
  password: any;
  
  constructor(private route: Router, private services: DataStoreService ) { }
  ngOnInit() {
    if(this.services.iscatch() ){
      this.route.navigate(['/posts']);
    }
  }
  onClickSubmit(date){
    console.log(date.email);
    this.services.signupUser(date.email, date.password);
  }

}
