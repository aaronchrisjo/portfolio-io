import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio-io';
  constructor(private router: Router){}
  

  ngOnInit():void{
    this.checkIfMobile();
    this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd){
        this.scrollTopWithOffset();
      }
    })
  }

  checkIfMobile(): void {
    const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent) 
      || window.innerWidth <= 800;
      
    if (isMobile) {
      alert('This app is not yet developed for mobile devices. Please continue using in a PC.');
    }
  }

  scrollTop(){
    window.scrollTo({top:0, behavior:'smooth'})
  }

  scrollTopWithOffset(){
    const heaaderHeight = document.querySelector('app-header')?.clientHeight || 60;
    window.scrollTo({top:heaaderHeight, behavior:'smooth'})
  }
}
