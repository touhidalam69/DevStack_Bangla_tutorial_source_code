import {
  Component, computed, inject, linkedSignal, signal,
} from '@angular/core';
import {
  HttpClient, HttpErrorResponse, httpResource,
} from '@angular/common/http';
import { Job, Page } from './job';
import { JobForm } from './job-form';

// Episode 7: same origin through the dev proxy, so the cookie goes along
const api = '/api/jobs';
const pageSize = 5;
type SortKey = 'company' | 'status' | 'appliedOn';

@Component({
  selector: 'app-jobs-page',
  imports: [JobForm],
  templateUrl: './jobs-page.html',
  styleUrl: './jobs-page.css',
})
export class JobsPage {
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

  protected message = signal('');

  protected remove(job: Job) {
    this.message.set('');
    this.http.delete(`${api}/${job.id}`).subscribe({
      next: () => this.jobs.reload(),
      // 403: signed in, but not allowed
      error: (err: HttpErrorResponse) => this.message.set(
        err.status === 403
          ? 'Only an admin can delete a job.'
          : 'Could not delete.'),
    });
  }
}
