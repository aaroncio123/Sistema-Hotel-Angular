import { Routes } from '@angular/router';
import { Home } from "../features/home/home";
import { adminGuard } from './admin.guard';
import { Informate } from '../features/informate/informate';

export const routes: Routes = [
    {path: '', redirectTo: 'informate', pathMatch: 'full'},
    {path: 'informate', component: Informate},
    {path: 'hoteles', loadComponent: () => import('../features/hoteles/hoteles').then(m => m.Hoteles)},
    {path: 'servicio', loadComponent: () => import('../features/servicio/servicio').then(m => m.Servicio)},
    {path: 'contacto', loadComponent: () => import('../features/contacto/contacto').then(m => m.Contacto)},

    // Ruta secreta protegida por el guardián
    {path: 'login', canActivate: [adminGuard], loadComponent: () => import('../features/login/login').then(m => m.Login)},
    {path: 'home', canActivate: [adminGuard], loadComponent: () => import('../features/home/home').then(m => m.Home)},
    // El comodín '**' SIEMPRE debe ser el último elemento del arreglo
    {path: '**', redirectTo: 'informate', pathMatch: 'full'},
];
