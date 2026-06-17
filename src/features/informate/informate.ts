import { Component } from '@angular/core';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-informate',
  imports: [],
  templateUrl: './informate.html',
  styleUrl: './informate.css',
})
export class Informate {
  categorias: Categoria[] = [];
}
