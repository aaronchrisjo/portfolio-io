import { Component, OnInit, HostListener } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string | null = null;
  transformStyle: string = '';

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.username = user.displayName ? user.displayName : user.email;
      } else {
        this.username = null;
      }
    });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const x = (window.innerWidth - event.pageX) / 100;
    const y = (window.innerHeight - event.pageY) / 100;

    this.transformStyle = `translate(${x}px, ${y}px)`;
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
