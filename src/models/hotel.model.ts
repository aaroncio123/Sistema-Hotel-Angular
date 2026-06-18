export interface Hotel{
    id_hotel: number;
    nombre: string;
    slug: string;
    descripcion_breve: string;
    descripcion: string;
    direccion: string;
    ciudad: string;
    telefono: string;
    correo: string;
    imagenUrl: string;
    activo: boolean;
    hotel: [];
    hotel_servicio: [];
}