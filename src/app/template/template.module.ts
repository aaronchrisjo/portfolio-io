import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { ExploreComponent } from './explore/explore.component';
import { AllTemplatesComponent } from './all-templates/all-templates.component';
import { DetailsComponent } from './details/details.component';
import { UploadTemplateComponent } from './upload-template/upload-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoritesComponent } from './favorites/favorites.component';
import { MyContributionsComponent } from './my-contributions/my-contributions.component';


@NgModule({
  declarations: [
    ExploreComponent,
    AllTemplatesComponent,
    DetailsComponent,
    UploadTemplateComponent,
    FavoritesComponent,
    MyContributionsComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    AllTemplatesComponent
  ]
})
export class TemplateModule { }
