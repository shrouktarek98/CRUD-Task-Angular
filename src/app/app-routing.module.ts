import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  {path: '', component: PostsComponent},
  {path: 'Signup', component: SignupComponent},
  {path: 'Signin', component: SigninComponent},
  {path: 'posts', component:PostsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
