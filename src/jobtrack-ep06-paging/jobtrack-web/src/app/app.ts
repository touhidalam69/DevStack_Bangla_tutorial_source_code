import {
  Component, computed, inject, linkedSignal, signal,
} from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Job, Page } from './job';
import { JobForm } from './job-form';

const api = 'http://localhost:5032/api/jobs';
const pageSize = 5;
type SortKey = 'company' | 'status' | 'appliedOn';

@Component({
  selector: 'app-root',
  imports: [JobForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private http = inject(HttpClient);

  protected statuses = [
    'All', 'Applied', 'Interview', 'Offer', 'Rejected',
  ];
  protected filter = signal('All');
  protected sort = signal<SortKey>('appliedOn');
  protected desc = signal(true);
  // back to page 1 whenever the filter or the sort changes
  protected page = linkedSignal({
    source: () => [this.filter(), this.sort(), this.desc()],
    computation: () => 1,
  });

  // a new request whenever one of these signals changes
  protected jobs = httpResource<Page<Job>>(() => {
    const params: Record<string, string | number | boolean> = {
      page: this.page(),
      pageSize,
      sort: this.sort(),
      desc: this.desc(),
    };
    if (this.filter() !== 'All') params['status'] = this.filter();
    return { url: api, params };
  });

  protected rows = computed(() =>
    this.jobs.hasValue() ? this.jobs.value().items : [],
  );
  protected total = computed(() =>
    this.jobs.hasValue() ? this.jobs.value().total : 0,
  );
  protected pages = computed(() =>
    Math.max(1, Math.ceil(this.total() / pageSize)),
  );

  // the same column again flips the direction
  protected sortBy(key: SortKey) {
    if (this.sort() === key) {
      this.desc.update((d) => !d);
    } else {
      this.sort.set(key);
      this.desc.set(false);
    }
  }

  protected arrow(key: SortKey) {
    if (this.sort() !== key) return '';
    return this.desc() ? '▼' : '▲';
  }

  protected editing = signal<Job | null>(null);

  protected onSaved() {
    this.editing.set(null);
    this.jobs.reload();
  }

  protected remove(job: Job) {
    this.http
      .delete(`${api}/${job.id}`)
      .subscribe(() => this.jobs.reload());
  }
}
