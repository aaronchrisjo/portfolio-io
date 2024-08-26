import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { CommonModule } from '@angular/common';
import { AllTemplatesComponent } from './all-templates/all-templates.component';
import { DetailsComponent } from './details/details.component';
import { UploadTemplateComponent } from './upload-template/upload-template.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MyContributionsComponent } from './my-contributions/my-contributions.component';
import { authGuard } from '../services/auth.guard';


const routes: Routes = [
  {path:'explore', component:ExploreComponent},
  {path:'all-template', component:AllTemplatesComponent},
  {path:'details', component:DetailsComponent},
  {path:'upload', component: UploadTemplateComponent, canActivate:[authGuard]},
  {path: 'favorites', component: FavoritesComponent, canActivate:[authGuard]},
  {path: 'my-contributions', component: MyContributionsComponent, canActivate:[authGuard]},
];

@NgModule({
  imports: [
    CommonModule,
     RouterModule.forChild(routes),
    ],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
