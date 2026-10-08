import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Job } from './job';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private http = inject(HttpClient);
  protected jobs = signal<Job[]>([]);
  protected error = signal('');

  constructor() {
    this.http.get<Job[]>('http://localhost:5032/api/jobs').subscribe({
      next: (data) => this.jobs.set(data),
      error: (err) => this.error.set(err.message),
    });
  }
}
