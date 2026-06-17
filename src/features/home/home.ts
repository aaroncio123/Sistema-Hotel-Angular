import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../service/categoria.service';
import { Categoria } from '../../models/categoria.model';

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

  nuevaCategoria: Categoria = {
    nombre: '',
    slug: '',
    descripcion: '',
    tarifaBase: 0,
    capacidad: 1,
    imagenUrl: '',
    activo: true
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.listar().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error cargando categorías', err)
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

  cambiarVista(vista: string) {
    this.vistaActual = vista;
  }

  regresar() {
    this.router.navigate(['/informate']);
  }
}
