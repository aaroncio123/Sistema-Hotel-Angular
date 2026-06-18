import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  usuario = '';
  clave = '';

  usuarioCorrecto = 'admin';
  claveCorrecta = 'password';

  constructor(private router: Router) {}

  validarLogin() {
    if (this.usuario === this.usuarioCorrecto && this.clave === this.claveCorrecta) {
      console.log('Login exitoso');
      this.router.navigate(['/home']);
    } else {
      console.log('Login fallido');
    }
  }
}
