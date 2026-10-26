import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from './auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected auth = inject(Auth);
  private router = inject(Router);

  protected async logout() {
    await this.auth.logout();
    await this.router.navigateByUrl('/login');
  }
}
