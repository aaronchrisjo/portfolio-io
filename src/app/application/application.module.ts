import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent
  ],
})
export class ApplicationModule { }
