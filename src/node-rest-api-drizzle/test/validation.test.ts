import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JobInput, JobPatch } from '../src/validation.ts';

test('a new job is Applied by default', () => {
  const job = JobInput.parse({
    company: ' Contoso ', role: 'Developer', appliedOn: '2026-10-20',
  });
  assert.equal(job.status, 'Applied');
  assert.equal(job.company, 'Contoso');
});

test('a patch does not reset the status', () => {
  const patch = JobPatch.parse({ role: 'Senior Developer' });
  assert.deepEqual(patch, { role: 'Senior Developer' });
});

test('an unknown status is rejected', () => {
  const result = JobInput.safeParse({
    company: 'Contoso', role: 'Developer',
    status: 'Hired', appliedOn: '2026-10-20',
  });
  assert.equal(result.success, false);
});
