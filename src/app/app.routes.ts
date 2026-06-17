import { Routes } from '@angular/router';
import { Home } from "../features/home/home";

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path: 'habitaciones', loadComponent: () => import('../features/habitaciones/habitaciones').then(m => m.Habitaciones)},
    {path: 'servicio', loadComponent: () => import('../features/servicio/servicio').then(m => m.Servicio)},
    {path: 'contacto', loadComponent: () => import('../features/contacto/contacto').then(m => m.Contacto)},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
