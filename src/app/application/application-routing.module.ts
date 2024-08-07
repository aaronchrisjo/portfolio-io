import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    {path:'home', component:HomeComponent},
    {path:'about', component:AboutComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
