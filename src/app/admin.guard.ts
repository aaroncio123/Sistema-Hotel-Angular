import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // TODO: Aquí conectarás con tu futuro servicio de autenticación
  // Ej: const authService = inject(AuthService);
  // Ej: const isAdmin = authService.esAdministrador();
  
  const isAdmin = true; // <-- Por ahora está en true para que puedas probar. Luego lo cambiarás a tu lógica real.

  if (isAdmin) {
    return true; // Permite el acceso
  } else {
    router.navigate(['/home']); // Si no es admin, lo patea al home
    return false; // Bloquea la ruta
  }
};