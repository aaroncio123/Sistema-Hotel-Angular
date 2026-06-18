export interface Habitacion {
  idHabitacion?: number;
  estado: string; // Ej: "Disponible", "Ocupada", "En Limpieza", "Mantenimiento"
  numero?: string;
  tipo?: string;
  piso?: number;
  id_hotel?: number; 
  id_categoria?: number;
  hotel?: any; // Propiedad para el objeto anidado que espera Spring Boot
  categoria?: any;
}