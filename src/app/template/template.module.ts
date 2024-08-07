import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { ExploreComponent } from './explore/explore.component';
import { AllTemplatesComponent } from './all-templates/all-templates.component';


@NgModule({
  declarations: [
    ExploreComponent,
    AllTemplatesComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule
  ]
})
export class TemplateModule { }
