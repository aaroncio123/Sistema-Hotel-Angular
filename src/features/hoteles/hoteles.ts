import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelService } from '../../service/hotel.service';
import { Hotel } from '../../models/hotel.model';
import { HabitacionService } from '../../service/habitacion.service';
import { Habitacion } from '../../models/habitacion.model';
import { ReservaService } from '../../service/reserva.service';
import { Reserva } from '../../models/reserva.model';

@Component({
  selector: 'app-hoteles',
  imports: [CommonModule, FormsModule],
  templateUrl: './hoteles.html',
  styleUrl: './hoteles.css',
})
export class Hoteles implements OnInit {
  hoteles: Hotel[] = [];
  hotelSeleccionado: Hotel | null = null;
  vistaActual: string = 'lista';
  habitacionesHotel: Habitacion[] = [];

  // Modelo temporal para la reserva
  nuevaReserva: any = {
    usuario: '',
    habitacionId: '',
    fecha_inicio: '',
    fecha_fin: ''
  };

  private hotelService = inject(HotelService);
  private location = inject(Location);
  private habitacionService = inject(HabitacionService);
  private reservaService = inject(ReservaService);

  ngOnInit() {
    this.cargarHoteles();
  }

  cargarHoteles() {
    this.hotelService.listar().subscribe({
      next: (data) => this.hoteles = data,
      error: (err) => console.error('Error al cargar hoteles', err)
    });
  }

  verDetalleHotel(hotel: Hotel) {
    this.hotelSeleccionado = hotel;
    this.vistaActual = 'detalle';
    // Cambia la URL en el navegador usando el slug sin recargar la página
    this.location.go(`/hoteles/${hotel.slug}`);
    this.cargarHabitacionesDelHotel(hotel.id_hotel);
  }

  cargarHabitacionesDelHotel(idHotel: number) {
    this.habitacionService.listar().subscribe({
      next: (data) => {
        // Filtramos las habitaciones soportando si el backend envía id_hotel plano o anidado
        this.habitacionesHotel = data.filter(h => h.id_hotel === idHotel || h.hotel?.id_hotel === idHotel);
      },
      error: (err) => console.error('Error al cargar habitaciones del hotel', err)
    });
  }

  prepararReserva() {
    this.vistaActual = 'reserva';
    this.location.go(`/hoteles/${this.hotelSeleccionado?.slug}/reservar`);
  }

  guardarReserva() {
    if (!this.nuevaReserva.usuario || !this.nuevaReserva.habitacionId || !this.nuevaReserva.fecha_inicio || !this.nuevaReserva.fecha_fin) {
      alert('Por favor complete todos los campos para la reserva.');
      return;
    }
    
    // Armamos el objeto de Reserva tal cual lo espera el backend de Spring Boot
    const reservaAGuardar: Reserva = {
      usuario: this.nuevaReserva.usuario,
      fecha_inicio: this.nuevaReserva.fecha_inicio,
      fecha_fin: this.nuevaReserva.fecha_fin,
      estado: 'Confirmada',
      habitacion: { idHabitacion: Number(this.nuevaReserva.habitacionId), estado: 'Disponible' }
    };

    this.reservaService.crear(reservaAGuardar).subscribe({
      next: () => {
        alert('¡Reserva registrada exitosamente!');
        this.nuevaReserva = { usuario: '', habitacionId: '', fecha_inicio: '', fecha_fin: '' };
        this.vistaActual = 'detalle';
        this.location.go(`/hoteles/${this.hotelSeleccionado?.slug}`);
        this.cargarHabitacionesDelHotel(this.hotelSeleccionado!.id_hotel); // Refrescamos las habitaciones para ver el nuevo estado
      },
      error: (err) => alert('Ocurrió un error al registrar la reserva. Es posible que la habitación ya esté ocupada.')
    });
  }

  volverALista() {
    this.vistaActual = 'lista';
    this.hotelSeleccionado = null;
    this.location.go('/hoteles');
  }
}
