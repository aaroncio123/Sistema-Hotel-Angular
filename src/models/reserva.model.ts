import { Habitacion } from './habitacion.model';

export interface Reserva {
  idReserva?: number;
  usuario: string;
  fecha_inicio: string | Date;
  fecha_fin: string | Date;
  estado?: string;
  habitacion?: Habitacion; 
  habitacionId?: number; // Propiedad auxiliar útil para capturar el valor en formularios
}