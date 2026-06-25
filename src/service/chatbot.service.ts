import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn:'root'
})
export class ChatbotService{

  private apiUrl = `${environment.BACKEND_URL}/api/chatbot`; // Ajusta la ruta a tu API real

  constructor(private http:HttpClient){}

  preguntar(mensaje:string){

    return this.http.post(
      this.apiUrl + "/preguntar",
      {
        mensaje
      }
    );

  }

}