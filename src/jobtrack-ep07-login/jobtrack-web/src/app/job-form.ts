import {
  Component, inject, input, linkedSignal, output,
} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  FieldTree, form, FormField, FormRoot, maxLength, required, validate,
  validateHttp,
} from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { Job, JobInput } from './job';

const api = '/api/jobs';
const blank: JobInput = {
  company: '', role: '', status: 'Applied', appliedOn: '',
};
const today = () => new Date().toISOString().slice(0, 10);

// a 400 from the API: each message goes on its own field
function toErrors(err: unknown, f: FieldTree<JobInput>) {
  if (!(err instanceof HttpErrorResponse) || err.status !== 400) {
    return { kind: 'server', message: 'Could not save. Try again.' };
  }
  const errors: Record<string, string[]> = err.error.errors;
  return Object.entries(errors).map(([name, [message]]) => ({
    kind: 'server',
    message,
    fieldTree: f[name as keyof JobInput],
  }));
}

@Component({
  selector: 'app-job-form',
  imports: [FormField, FormRoot],
  templateUrl: './job-form.html',
  styleUrl: './job-form.css',
})
export class JobForm {
  private http = inject(HttpClient);
  job = input<Job | null>(null);
  saved = output();
  cancelled = output();
  protected statuses = ['Applied', 'Interview', 'Offer', 'Rejected'];

  // a new job to edit resets the model
  protected model = linkedSignal<JobInput>(() => {
    const job = this.job();
    return job ? { ...job, appliedOn: job.appliedOn ?? '' } : blank;
  });
  protected jobForm = form(this.model, (s) => {
    required(s.company, { message: 'Company is required.' });
    maxLength(s.company, 100, { message: 'Max 100 characters.' });
    required(s.role, { message: 'Role is required.' });
    validate(s.appliedOn, ({ value }) =>
      value() > today()
        ? { kind: 'future', message: 'That date is in the future.' }
        : null,
    );
    validateHttp(s.company, {
      when: () => !this.job(),
      request: ({ value }) =>
        `${api}/exists?company=${encodeURIComponent(value())}`,
      onSuccess: (res: { exists: boolean }) =>
        res.exists
          ? { kind: 'duplicate', message: 'Already in your list.' }
          : null,
      onError: () => ({ kind: 'check', message: 'Could not check.' }),
      debounce: 300,
    });
  }, {
    submission: { action: (f) => this.submit(f) },
  });

  // runs only when every rule passes
  private async submit(f: FieldTree<JobInput>) {
    try {
      await this.save(f().value());
    } catch (err) {
      return toErrors(err, f);
    }
    f().reset(blank);
    this.saved.emit();
    return undefined;
  }

  private save(value: JobInput) {
    const body = { ...value, appliedOn: value.appliedOn || null };
    const job = this.job();
    return firstValueFrom(job
      ? this.http.put(`${api}/${job.id}`, body)
      : this.http.post(api, body));
  }
}
