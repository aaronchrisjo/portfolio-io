import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {path:'explore', component:ExploreComponent}
];

@NgModule({
  imports: [
    CommonModule,
     RouterModule.forChild(routes)
    ],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
