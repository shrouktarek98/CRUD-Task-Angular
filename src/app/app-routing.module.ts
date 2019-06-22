import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './data-store/signin/signin.component';
import { SignupComponent } from './data-store/signup/signup.component';
import { PostsComponent } from './crud/posts/posts.component';

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
