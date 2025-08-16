import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// guard for checking if user logged in , if not navigate user to login page
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.user$() && !authService.isTokenExpired()) {
    return true;
  }

  return router.navigate(["login"])
};
