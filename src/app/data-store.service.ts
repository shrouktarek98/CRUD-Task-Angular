import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { error } from 'util';
import { Response } from 'selenium-webdriver/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  token: string;
  user: Observable<firebase.User>;
  displayName:any;
  admin: any;

  
  constructor (private router: Router, public afauth: AngularFireAuth ) {
    this.user = afauth.authState;
  }
  loginWithGoogle() {
    const provide = new firebase.auth.GoogleAuthProvider();
    this.afauth.auth.signInWithPopup(provide)
    .then(
      response => {
         if(firebase.auth().currentUser!=null){
           localStorage.setItem('user', JSON.stringify(firebase.auth().currentUser));
          this.router.navigate(['/posts']);
        }
      }
    )
    .catch(
      error => console.log(error)
    );
  }
  logOut() {
    this.afauth.auth.signOut();
    this.token= null;
    this.admin=false;
    localStorage.removeItem('user');
    this.router.navigate(['Signin']);
 
  }


  public signupUser(email: string , password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password )
    .catch(
      error => console.log(error)
    );
  }
  
  public signinUser(email: string , password: string) {
    if(email== 'Admin' && password=='1234'){
      this.admin=true;
      this.router.navigate(['/posts']);
      localStorage.setItem('user', JSON.stringify('doneadmin'));
    }
    else{
      firebase.auth().signInWithEmailAndPassword(email, password )
    .then(
      response => {
        localStorage.setItem('user', JSON.stringify(firebase.auth().currentUser));
          this.router.navigate(['/posts']);
      }
    )
    .catch(
      error => console.log("KKKKKKKKKKKKK")
    );
    }
    
  }
  iscatch(){
    if(localStorage.getItem('user') != null){
      
      this.token=localStorage.getItem('user');
    }
    return this.token != null;
  }
 

}
