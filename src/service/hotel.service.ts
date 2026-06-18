import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = `${environment.BACKEND_URL}/api/hoteles`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl);
  }

  crear(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.apiUrl, hotel);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}