import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacion } from '../models/habitacion.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private apiUrl = `${environment.BACKEND_URL}/api/habitaciones`; // Ajusta la ruta a tu API real

  constructor(private http: HttpClient) { }

  listar(): Observable<Habitacion[]> {
    return this.http.get<Habitacion[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Habitacion> {
    return this.http.get<Habitacion>(`${this.apiUrl}/${id}`);
  }

  crear(habitacion: Habitacion): Observable<Habitacion> {
    return this.http.post<Habitacion>(this.apiUrl, habitacion);
  }

  actualizar(id: number, habitacion: Habitacion): Observable<Habitacion> {
    return this.http.put<Habitacion>(`${this.apiUrl}/${id}`, habitacion);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}