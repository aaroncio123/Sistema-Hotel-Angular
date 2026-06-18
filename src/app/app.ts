import { Component, signal } from '@angular/core';
import { Header } from '../shared/header/header'
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Footer } from '../shared/footer/footer';
import { Chatbot } from '../shared/chatbot/chatbot';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Chatbot ,Footer],
  standalone: true,
  providers: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isLoginRoute = signal(false);
  isHomeRoute = signal(false);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isLoginRoute.set(event.urlAfterRedirects.includes('/login'));
      this.isHomeRoute.set(event.urlAfterRedirects === '/home');
    });
  }
}
