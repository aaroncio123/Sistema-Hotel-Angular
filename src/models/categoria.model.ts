export interface Categoria {
    idCategoria?: number;
    nombre: string;
    slug: string;
    descripcion: string;
    tarifaBase: number;
    capacidad: number;
    imagenUrl: string;
    activo: boolean;
}