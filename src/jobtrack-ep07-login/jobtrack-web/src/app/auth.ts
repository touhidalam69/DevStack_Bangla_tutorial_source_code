import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

// Who is signed in. The cookie is httpOnly, so JavaScript cannot read it:
// we ask the API instead. undefined = not asked yet, null = nobody.
@Injectable({ providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);
  readonly email = signal<string | null | undefined>(undefined);

  async check() {
    if (this.email() === undefined) {
      try {
        const info = await firstValueFrom(
          this.http.get<{ email: string }>('/api/auth/manage/info'));
        this.email.set(info.email);
      } catch {
        this.email.set(null);
      }
    }
    return this.email();
  }

  async login(email: string, password: string) {
    await firstValueFrom(this.http.post(
      '/api/auth/login?useCookies=true', { email, password }));
    this.email.set(email);
  }

  async logout() {
    await firstValueFrom(this.http.post('/api/auth/logout', {}));
    this.email.set(null);
  }
}
