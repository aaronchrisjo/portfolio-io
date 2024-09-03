import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { FooterComponent } from './footer/footer.component';
import { AuthenticationModule } from '../authentication/authentication.module';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupModalComponent } from './signup-modal/signup-modal.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    LoginModalComponent,
    SignupModalComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
  ],
})
export class ApplicationModule { }
