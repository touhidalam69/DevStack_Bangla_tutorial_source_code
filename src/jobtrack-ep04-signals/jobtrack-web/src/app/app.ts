import { Component, computed, inject, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Job } from './job';

const api = 'http://localhost:5032/api/jobs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private http = inject(HttpClient);
  protected jobs = httpResource<Job[]>(() => api);
  private list = computed(() =>
    this.jobs.hasValue() ? this.jobs.value() : [],
  );

  protected statuses = [
    'All', 'Applied', 'Interview', 'Offer', 'Rejected',
  ];
  protected filter = signal('All');

  protected shown = computed(() => {
    const status = this.filter();
    return status === 'All'
      ? this.list()
      : this.list().filter((job) => job.status === status);
  });

  protected counts = computed(() => {
    const counts: Record<string, number> = { All: this.list().length };
    for (const job of this.list()) {
      counts[job.status] = (counts[job.status] ?? 0) + 1;
    }
    return counts;
  });

  protected remove(job: Job) {
    this.http
      .delete(`${api}/${job.id}`)
      .subscribe(() => this.jobs.reload());
  }
}
