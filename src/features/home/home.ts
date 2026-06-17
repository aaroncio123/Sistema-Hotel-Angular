import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  vistaActual: string = 'dashboard'; // Controla qué sección se muestra

  constructor(private router: Router) {}

  cambiarVista(vista: string) {
    this.vistaActual = vista;
  }

  regresar() {
    this.router.navigate(['/informate']);
  }
}
