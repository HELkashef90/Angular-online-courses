import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  component: LandingComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'signup',
  component: SignupComponent
},
{
  path: "user",
  children: [{
    //routed here

    //default route
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }],

},
{
  path: "admin",
  children: [{
    //routed here

    //default route
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }],

},
{
  path: "instructor",
  children: [{
    //routed here

    //default route
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }],

},
{
  path: '**',
  redirectTo: '', //404
  pathMatch: 'full'
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
