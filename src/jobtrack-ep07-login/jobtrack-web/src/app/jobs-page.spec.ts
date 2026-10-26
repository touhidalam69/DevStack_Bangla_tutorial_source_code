import { WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { JobsPage } from './jobs-page';

const api = '/api/jobs';

describe('JobsPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsPage],
      // requests are recorded, not sent to the real API
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
      .compileComponents();
  });

  it('asks the API for page 1, newest first', async () => {
    const fixture = TestBed.createComponent(JobsPage);
    TestBed.tick();
    // httpResource keeps the page unstable until its request is answered
    const req = TestBed.inject(HttpTestingController)
      .expectOne((r) => r.url === api);
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('sort')).toBe('appliedOn');
    expect(req.request.params.get('desc')).toBe('true');
    req.flush({ items: [], page: 1, pageSize: 5, total: 0 });
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.pager')?.textContent).toContain('Page 1 of 1');
  });

  it('goes back to page 1 when the filter changes', () => {
    const fixture = TestBed.createComponent(JobsPage);
    const page = fixture.componentInstance as unknown as {
      page: WritableSignal<number>;
      filter: WritableSignal<string>;
    };
    page.page.set(3);
    page.filter.set('Offer');
    expect(page.page()).toBe(1);
  });
});
