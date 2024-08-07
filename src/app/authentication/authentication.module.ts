import { ApplicationModule, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ApplicationModule
  ]
})
export class AuthenticationModule { }
