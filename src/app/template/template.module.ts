import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { ExploreComponent } from './explore/explore.component';
import { AllTemplatesComponent } from './all-templates/all-templates.component';
import { DetailsComponent } from './details/details.component';
import { UploadTemplateComponent } from './upload-template/upload-template.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FavoritesComponent } from './favorites/favorites.component';


@NgModule({
  declarations: [
    ExploreComponent,
    AllTemplatesComponent,
    DetailsComponent,
    UploadTemplateComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    AllTemplatesComponent
  ]
})
export class TemplateModule { }
