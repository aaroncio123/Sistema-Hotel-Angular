import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../service/categoria.service';
import { Categoria } from '../../models/categoria.model';
import { Hotel } from '../../models/hotel.model';
import { HotelService } from '../../service/hotel.service';
import { HabitacionService } from '../../service/habitacion.service';
import { Habitacion } from '../../models/habitacion.model';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  vistaActual: string = 'dashboard'; // Controla qué sección se muestra

  private categoriaService = inject(CategoriaService);
  categorias: Categoria[] = [];

  private hotelService = inject(HotelService);
  hoteles: Hotel[] = [];

  private habitacionService = inject(HabitacionService);
  habitaciones: Habitacion[] = [];

  nuevaCategoria: Categoria = {
    nombre: '',
    slug: '',
    descripcion: '',
    tarifaBase: 0,
    capacidad: 1,
    imagenUrl: '',
    activo: true
  };

  nuevoHotel: Hotel = {
    id_hotel: 0,
    nombre: '',
    slug: '',
    descripcion_breve: '',
    descripcion: '',
    direccion: '',
    ciudad: '',
    telefono: '',
    correo: '',
    imagenUrl: '',
    activo: true,
    hotel: [],
    hotel_servicio: []
  };

  nuevaHabitacion: Habitacion = {
    idHabitacion: 0,
    estado: 'Disponible',
    numero: '',
    piso: 1,
    id_hotel: 0,
    id_categoria: 0
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarCategorias();
    this.cargarHoteles(); // Carga los hoteles al iniciar la página
    this.cargarHabitaciones();
  }

  cargarCategorias() {
    this.categoriaService.listar().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error cargando categorías', err)
    });
  }

  cargarHoteles() {
    this.hotelService.listar().subscribe({
      next: (data) => this.hoteles = data,
      error: (err) => console.error('Error cargando hoteles', err)
    });
  }

  cargarHabitaciones() {
    this.habitacionService.listar().subscribe({
      next: (data) => this.habitaciones = data,
      error: (err) => console.error('Error cargando habitaciones', err)
    });
  }

  crearCategoria() {
    // Generamos un slug simple a partir del nombre (Ej: "Suite Presidencial" -> "suite-presidencial")
    this.nuevaCategoria.slug = this.nuevaCategoria.nombre.toLowerCase().replace(/ /g, '-');

    this.categoriaService.crear(this.nuevaCategoria).subscribe({
      next: () => {
        this.cargarCategorias();
        alert('Categoría creada exitosamente');
        this.nuevaCategoria = { nombre: '', slug: '', descripcion: '', tarifaBase: 0, capacidad: 1, imagenUrl: '', activo: true };
      },
      error: (err) => console.error('Error creando categoría', err)
    });
  }

  crearHotel() {
    // Si el usuario no ingresó un slug manualmente, lo generamos en base al nombre
    if (!this.nuevoHotel.slug && this.nuevoHotel.nombre) {
      this.nuevoHotel.slug = this.nuevoHotel.nombre.toLowerCase().replace(/ /g, '-');
    }
    
    this.hotelService.crear(this.nuevoHotel).subscribe({
      next: () => {
        this.cargarHoteles();
        alert('Hotel creado exitosamente');
        this.nuevoHotel = { id_hotel: 0, nombre: '', slug: '', descripcion_breve: '', descripcion: '', direccion: '', ciudad: '', telefono: '', correo: '', imagenUrl: '', activo: true, hotel: [], hotel_servicio: [] };
      },
      error: (err) => console.error('Error creando hotel', err)
    });
  }

  crearHabitacion() {
    const hotelIdSeleccionado = Number(this.nuevaHabitacion.id_hotel);
    const categoriaIdSeleccionada = Number(this.nuevaHabitacion.id_categoria);

    // 1. Validamos que el administrador realmente haya seleccionado un hotel
    if (!hotelIdSeleccionado || hotelIdSeleccionado === 0) {
      alert('Error: Debes seleccionar a qué hotel pertenece esta habitación.');
      return;
    }

    if (!categoriaIdSeleccionada || categoriaIdSeleccionada === 0) {
      alert('Error: Debes seleccionar la categoría de la habitación.');
      return;
    }

    // 2. Validamos el campo de texto requerido por la base de datos
    if (!this.nuevaHabitacion.numero) {
      alert('Error: Debes ingresar el número de la habitación.');
      return;
    }

    // Armamos el objeto tal cual lo espera Spring Boot:
    const habitacionAGuardar: any = {
      estado: this.nuevaHabitacion.estado,
      numero: this.nuevaHabitacion.numero,
      piso: this.nuevaHabitacion.piso,
      hotel: { 
        id_hotel: hotelIdSeleccionado,
        idHotel: hotelIdSeleccionado
      },
      categoria: {
        idCategoria: categoriaIdSeleccionada,
        id_categoria: categoriaIdSeleccionada
      }
    };

    this.habitacionService.crear(habitacionAGuardar).subscribe({
      next: () => {
        this.cargarHabitaciones();
        alert('Habitación guardada exitosamente');
        this.nuevaHabitacion = { idHabitacion: 0, estado: 'Disponible', numero: '', piso: 1, id_hotel: 0, id_categoria: 0 };
      },
      error: (err) => {
        console.error('Error creando habitación', err);
        // Extraemos el mensaje real que Spring Boot envió para saber qué falló
        const mensajeBackend = err.error?.message || err.error || 'Error interno 500 en Spring Boot';
        alert('Falló el registro en el servidor:\n' + (typeof mensajeBackend === 'string' ? mensajeBackend : JSON.stringify(mensajeBackend)));
      }
    });
  }

  cambiarVista(vista: string) {
    this.vistaActual = vista;
  }

  regresar() {
    this.router.navigate(['/informate']);
  }
}
