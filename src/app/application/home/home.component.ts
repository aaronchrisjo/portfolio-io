import { Component } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username: string | null = null;

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // The user is logged in, extract the display name
        this.username = user.displayName ? user.displayName : user.email;
      } else {
        // The user is not logged in, handle accordingly
        this.username = null;
      }
    });
  }
}
