import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  email, form, FormField, FormRoot, required,
} from '@angular/forms/signals';
import { Auth } from './auth';

@Component({
  selector: 'app-login-page',
  imports: [FormField, FormRoot],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private auth = inject(Auth);
  private router = inject(Router);

  protected model = signal({ email: '', password: '' });
  protected loginForm = form(this.model, (s) => {
    required(s.email, { message: 'Email is required.' });
    email(s.email, { message: 'That is not an email.' });
    required(s.password, { message: 'Password is required.' });
  }, {
    submission: { action: (f) => this.login(f().value()) },
  });

  private async login(value: { email: string; password: string }) {
    try {
      await this.auth.login(value.email, value.password);
    } catch (err) {
      const wrong = err instanceof HttpErrorResponse && err.status === 401;
      return {
        kind: 'server',
        message: wrong ? 'Wrong email or password.' : 'Could not sign in.',
      };
    }
    await this.router.navigateByUrl('/');
    return undefined;
  }
}
