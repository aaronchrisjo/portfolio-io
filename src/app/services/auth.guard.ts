
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Adjust the path as necessary
import { inject } from '@angular/core';
import { map } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);  // Inject the AuthService
  const router = inject(Router);            // Inject the Router

  // Check if the user is authenticated
  return authService.isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
