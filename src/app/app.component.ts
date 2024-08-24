import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio-io';

  ngOnInit():void{
    this.checkIfMobile();
  }

  checkIfMobile(): void {
    const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent) 
      || window.innerWidth <= 800;
      
    if (isMobile) {
      alert('This app is not yet developed for mobile devices. Please continue using in a PC.');
    }
  }
}
