import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = `${environment.BACKEND_URL}/api/reservas`; // Ajusta la ruta a tu API real

  constructor(private http: HttpClient) { }

  listar(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`);
  }

  crear(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  actualizar(id: number, reserva: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.apiUrl}/${id}`, reserva);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}