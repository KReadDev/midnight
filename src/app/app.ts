import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import {App as AppCap } from '@capacitor/app';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('midnight');
  protected readonly isMobileMenuOpen = signal(false);

  constructor(private location: Location) {}
  
  ngOnInit() {
    AppCap.addListener('backButton', () => {
      this.goback();
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  goback(){
    this.location.back();
  }

  goForward(){
    this.location.forward();
  }
}
