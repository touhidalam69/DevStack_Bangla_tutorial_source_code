import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router, UrlTree } from '@angular/router';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
  });

  const run = () => TestBed.runInInjectionContext(
    () => authGuard({} as never, {} as never) as Promise<boolean | UrlTree>);

  it('sends a signed-out user to /login', async () => {
    const result = run();
    TestBed.inject(HttpTestingController).expectOne('/api/auth/manage/info')
      .flush(null, { status: 401, statusText: 'Unauthorized' });
    const url = TestBed.inject(Router).serializeUrl(await result as UrlTree);
    expect(url).toBe('/login');
  });

  it('lets a signed-in user in', async () => {
    const result = run();
    TestBed.inject(HttpTestingController).expectOne('/api/auth/manage/info')
      .flush({ email: 'user@jobtrack.test' });
    expect(await result).toBe(true);
  });
});
