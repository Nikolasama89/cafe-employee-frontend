import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService)
  const router = inject(Router)

  const required = route.data?.["roles"] as string[] | undefined
  const user = auth.user$()

  // Οχι logged in ή ληγμένο token
  if (!user || auth.isTokenExpired()) {
    router.navigate(['/login'])
    return false
  }

  // αν δεν ζητα ρολους το route το αφηνουμε να περασει
  if(!required || required.length === 0) return true;

  // single role check
  if(required.includes(user.role)) return true

  router.navigate(['/'])
  return false
};
