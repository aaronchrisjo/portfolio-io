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

    // Initialize scroll listener
    this.updateSections(window.scrollY);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const x = (window.innerWidth - event.pageX) / 100;
    const y = (window.innerHeight - event.pageY) / 100;

    this.transformStyle = `translate(${x}px, ${y}px)`;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateSections(window.scrollY);
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private updateSections(scrollPosition: number): void {
    const sections = Array.from(document.querySelectorAll('.step-section')) as HTMLElement[];
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition > (sectionTop - window.innerHeight / 1.2)) {
        section.classList.add('visible');
      } else {
        section.classList.remove('visible');
      }
    });
  }
}
