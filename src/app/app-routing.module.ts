import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './application/home/home.component';
import { AboutComponent } from './application/about/about.component';
import { ExploreComponent } from './template/explore/explore.component';
import { AllTemplatesComponent } from './template/all-templates/all-templates.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path:'home', component: HomeComponent},
  { path:'about', component: AboutComponent},
  
  {path:'explore', component:ExploreComponent},
  {path:'all-template', component:AllTemplatesComponent},

  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
