import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
  ]
})
export class ApplicationModule { }
