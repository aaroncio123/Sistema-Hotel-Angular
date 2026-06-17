import { Component, signal } from '@angular/core';
import { Home } from '../features/home/home';
import { Header } from '../shared/header/header'

@Component({
  selector: 'app-root',
  imports: [Header, Home],
  standalone: true,
  providers: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
