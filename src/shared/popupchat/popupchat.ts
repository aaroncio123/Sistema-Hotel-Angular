import { Component } from '@angular/core';
import { ChatbotService } from '../../service/chatbot.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './popupchat.html',
  styleUrl: './popupchat.css',
})

export class PopupChat {

  mensajeUsuario = '';

  mensajes = [
    {
      remitente: 'bot',
      texto: 'Hola, soy el asistente virtual de HotelesUPN. ¿En qué puedo ayudarte?'
    }
  ];

  constructor(private chatbotService: ChatbotService) {}

  enviarPregunta() {
    if (!this.mensajeUsuario.trim()) return;

    const pregunta = this.mensajeUsuario;

    this.mensajes.push({
      remitente: 'usuario',
      texto: pregunta
    });

    this.mensajeUsuario = '';

    this.chatbotService.preguntar(pregunta).subscribe({
      next: (res: any) => {
        this.mensajes.push({
          remitente: 'bot',
          texto: res.respuesta
        });
      },
      error: (err) => {
        console.error('Error chatbot:', err);

        this.mensajes.push({
          remitente: 'bot',
          texto: 'No pude obtener respuesta del servidor.'
        });
      }
    });
  }
  chatAbierto = false;

  toggleChat() {
    this.chatAbierto = !this.chatAbierto;
  }

  cerrarChat() {
    this.chatAbierto = false;
}
}