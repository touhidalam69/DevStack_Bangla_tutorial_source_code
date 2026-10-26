import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { JobsPage } from './jobs-page';
import { LoginPage } from './login-page';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: '', component: JobsPage, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
