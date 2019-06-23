import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './data-store/signin/signin.component';
import { SignupComponent } from './data-store/signup/signup.component';
import { PostsComponent } from './crud/posts/posts.component';
import { CrudService } from './crud/services/crud.service';
import { ResolveService } from './crud/services/resolve.service';

const routes: Routes = [
  {path: '', component: PostsComponent},
  {path: 'signUp', component: SignupComponent},
  {path: 'signIn', component: SigninComponent},
  {path: 'posts', component: PostsComponent,
  //  canActivate: [CrudService], resolve: {
  //    posts: ResolveService
  //  }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled'})],

exports: [RouterModule]
})
export class AppRoutingModule { }
