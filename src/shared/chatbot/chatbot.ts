import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  imports: [],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})
export class Chatbot {
  
  conectarIA() {
    console.log('Preparando conexión a la API con IA...');
  }
}
