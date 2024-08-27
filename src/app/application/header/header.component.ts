import { Component, EventEmitter, HostListener, OnInit, Output, output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Auth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class HeaderComponent implements OnInit {
  isAuthenticated$: Observable<User | null>;
  currentRoute: string = '';   
  isOpen = false;
  isDropdownOpen = false;
  username: string | null = null;
  
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private auth: Auth
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated;
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.username = user.displayName ? user.displayName : user.email;
      } else {
        this.username = null;
      }
    });
  }

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation(); // Prevent the document click from closing the dropdown
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.relative');
    
    // Close the dropdown if the click is outside the dropdown and toggle button
    if (this.isDropdownOpen && !dropdown?.contains(target)) {
      this.isDropdownOpen = false;
    }
  }

  async onLogout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/home']);
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  settingsTemp(): void {
    alert('This page is still under development.');
  }

}
