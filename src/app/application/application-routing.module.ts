import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { ExploreComponent } from '../template/explore/explore.component';
import { SignupComponent } from '../authentication/signup/signup.component';
import { LoginComponent } from '../authentication/login/login.component';

const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'about', component:AboutComponent},
    {path:'explore', component:ExploreComponent},
    // {path:'signup', component:SignupComponent},
    // {path:'login', component:LoginComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
