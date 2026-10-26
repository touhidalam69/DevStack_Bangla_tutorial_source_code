import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Auth } from './auth';

// a 401 from the API means the session is gone: back to the login page
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const router = inject(Router);
  return next(req).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse && err.status === 401
          && !req.url.startsWith('/api/auth/')) {
        auth.email.set(null);
        router.navigate(['/login']);
      }
      return throwError(() => err);
    }),
  );
};
