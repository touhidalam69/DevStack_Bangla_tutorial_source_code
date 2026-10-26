import { test } from 'node:test';
import assert from 'node:assert/strict';
import { staleInterviews } from '../src/jobs.js';

const jobs = [
  { company: 'Fabrikam', role: 'Dev', status: 'Interview',
    appliedOn: '2026-09-28', lastContact: '2026-10-06' },
  { company: 'Adatum', role: 'Dev', status: 'Interview',
    appliedOn: '2026-09-01', lastContact: '2026-10-16' },
  { company: 'Proseware', role: 'Dev', status: 'Interview',
    appliedOn: '2026-10-05', lastContact: '2026-10-17' },
  { company: 'Contoso', role: 'Dev', status: 'Applied',
    appliedOn: '2026-09-01', lastContact: '2026-09-01' },
  { company: 'Woodgrove', role: 'Dev', status: 'Interview',
    appliedOn: '2026-09-01' },
];
// 26 Oct 2026, 12:30 AM local time
const today = new Date(2026, 9, 26, 0, 30);

test('staleInterviews: Interview 10+ days since lastContact, oldest first', () => {
  assert.deepEqual(
    staleInterviews(jobs, today)
      .map(({ company, daysSinceContact }) => ({ company, daysSinceContact })),
    [
      { company: 'Fabrikam', daysSinceContact: 20 },
      { company: 'Adatum', daysSinceContact: 10 },
    ],
  );
});

test('staleInterviews: counts from lastContact, not appliedOn', () => {
  const names = staleInterviews(jobs, today).map((job) => job.company);
  assert.ok(!names.includes('Proseware')); // 9 days since contact
});
