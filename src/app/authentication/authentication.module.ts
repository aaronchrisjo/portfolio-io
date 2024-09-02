import { ApplicationModule, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { firebaseConfig } from '../../environments/firebaseConfig';
import { AuthService } from '../services/auth.service';
import { appConfig } from '../app.config';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { LoginModalComponent } from '../application/login-modal/login-modal.component';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ApplicationModule,
    ReactiveFormsModule,
   
  ],
  providers:[
    ...appConfig.providers,
    AuthService
  ]
})
export class AuthenticationModule { }
