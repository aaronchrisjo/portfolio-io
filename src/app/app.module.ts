import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationModule } from './application/application.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { TemplateModule } from './template/template.module';
import { firebaseConfig } from '../environments/firebaseConfig';
import { AuthService } from './services/auth.service';
import { appConfig } from './app.config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApplicationModule,
    AuthenticationModule,
    TemplateModule,
  ],
  providers:[
    ...appConfig.providers,
    AuthService,
    provideFirebaseApp(() => initializeApp({"projectId":"portfolio-io-2509","appId":"1:980713195826:web:959889c95f900f6d852f2b","storageBucket":"portfolio-io-2509.appspot.com","apiKey":"AIzaSyB5DitSmEXjjYXjv9SHY2WPzyssVKOweiE","authDomain":"portfolio-io-2509.firebaseapp.com","messagingSenderId":"980713195826","measurementId":"G-H2HHH9C1Y7"})),
    provideAuth(() => getAuth())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
