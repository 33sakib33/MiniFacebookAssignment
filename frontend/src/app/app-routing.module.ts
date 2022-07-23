import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './user/feed/feed.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  {path: '' , component: SignUpComponent},
  {path: 'signup' , component: SignUpComponent},
  {path: 'signin' , component: SignInComponent},
  {path: 'feed' , component: FeedComponent, canActivate:[AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
