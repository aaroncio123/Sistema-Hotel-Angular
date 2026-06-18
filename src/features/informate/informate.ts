import { Component, inject, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../service/categoria.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './informate.html',
  styleUrl: './informate.css',
})
export class Informate implements OnInit {
  categorias: Categoria[] = [];
  private categoriaService = inject(CategoriaService);

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.listar().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error al cargar categorías', err)
    });
  }
}
