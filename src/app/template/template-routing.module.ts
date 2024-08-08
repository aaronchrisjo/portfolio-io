import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { CommonModule } from '@angular/common';
import { AllTemplatesComponent } from './all-templates/all-templates.component';
import { DetailsComponent } from './details/details.component';
import { UploadTemplateComponent } from './upload-template/upload-template.component';

const routes: Routes = [
  {path:'explore', component:ExploreComponent},
  {path:'all-template', component:AllTemplatesComponent},
  {path:'details', component:DetailsComponent},
  {path:'upload', component: UploadTemplateComponent},
];

@NgModule({
  imports: [
    CommonModule,
     RouterModule.forChild(routes)
    ],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
