import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';

// signed in: go on; otherwise: to the login page
export const authGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);
  return (await auth.check()) ? true : router.createUrlTree(['/login']);
};
