import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from './../services/alert.service';



@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  token: string;
  user: Observable<firebase.User>;
  admin: any;
  userSignUp = null;
  userSignIn = null;
  error = false;


  constructor (private router: Router, public angularFireAuth: AngularFireAuth, private alertService: AlertService) {
    this.user = angularFireAuth.authState;
  }
  loginWithGoogle() {
    const provide = new firebase.auth.GoogleAuthProvider();
    this.angularFireAuth.auth.signInWithPopup(provide)
    .then(
      response => {
         if (firebase.auth().currentUser != null) {
           localStorage.setItem('user', JSON.stringify(firebase.auth().currentUser));
           this.alertService.success('Login Success');
           this.router.navigate(['/posts']);
        }
      }
    )
    .catch(
      response => {
        this.router.navigate(['/signIn']);
       }
    );
  }

  logOut() {
    this.angularFireAuth.auth.signOut();
    this.token = null;
    this.admin = false;
    this.userSignIn = null;
    this.userSignUp = null;
    localStorage.removeItem('user');
    this.router.navigate(['signIn']);
    this.alertService.warning('You are Logout');
  }


  public signUpUser(email: string , password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password )
    .then(
      response => {
         this.signInUser(email, password);
         this.alertService.success('Sign Up Success');
      }
    ) .catch(
      (error: string) => {
        this.userSignUp = error,
        this.alertService.error('Sign Up Fail');
      }
    );
  }

  public signInUser(email: string , password: string) {
    if (email === 'Admin' && password === '1234') {
      this.admin = true;
      this.router.navigate(['/posts']);
      localStorage.setItem('user', JSON.stringify('doneAdmin'));
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password )
      .then(
        response => {
          localStorage.setItem('user', JSON.stringify(firebase.auth().currentUser));
          this.router.navigate(['/posts']);
          this.alertService.success('Login Success');
        }
      ) .catch(
        (error: string) => {
          this.userSignIn = error,
          this.alertService.error('Login Fail');
        }
      );
    }
  }

  isCatch() {
    if (localStorage.getItem('user') != null) {
      this.token = localStorage.getItem('user');
    }
    return this.token != null;
  }
}
