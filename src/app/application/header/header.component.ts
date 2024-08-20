import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Auth, user, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAuthenticated$: Observable<User | null>;
  currentRoute: string = '';   
  isOpen = false;
  isDropdownOpen = false;
  username: string | null = null;


  constructor(private authService: AuthService, private router: Router, private auth:Auth) {
    this.isAuthenticated$ = this.authService.isAuthenticated;
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit():void{
    onAuthStateChanged(this.auth, (user)=>{
      if(user){
        this.username = user.displayName? user.displayName : user.email
      } else{
        this.username = null;
      }
    })
  }

  async onLogout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/home']);
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
