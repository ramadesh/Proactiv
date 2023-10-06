import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const loggedIn = authService.isLoggedIn();
  if(!loggedIn) {
    alert('Please log in first before accessing this page.');
    router.navigate(["/login"]);
  }
  return loggedIn;
};