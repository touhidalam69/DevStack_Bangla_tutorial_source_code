import { test } from 'node:test';
import assert from 'node:assert/strict';
import { byStatus, formatJob, followUps } from '../src/jobs.js';

const jobs = [
  { company: 'Contoso', role: 'Dev',
    status: 'Applied', appliedOn: '2026-09-24' },
  { company: 'Fabrikam', role: 'Dev',
    status: 'Interview', appliedOn: '2026-09-28' },
];

test('byStatus keeps only matching jobs', () => {
  assert.deepEqual(byStatus(jobs, 'Interview'), [jobs[1]]);
});

test('formatJob shows company, role, status and date', () => {
  assert.match(formatJob(jobs[0]), /^Contoso\s+Dev\s+Applied\s+2026-09-24$/);
});

test('followUps: Applied 7+ days, oldest first, with daysAgo', () => {
  const all = [
    ...jobs,
    { company: 'Litware', role: 'Intern',
      status: 'Applied', appliedOn: '2026-10-01' },
    { company: 'Tailspin', role: 'Dev',
      status: 'Applied', appliedOn: '2026-10-02' },
    { company: 'Northwind', role: 'Dev',
      status: 'Offer', appliedOn: '2026-09-01' },
  ];
  assert.deepEqual(
    followUps(all, new Date(2026, 9, 8))
      .map(({ company, daysAgo }) => ({ company, daysAgo })),
    [
      { company: 'Contoso', daysAgo: 14 },
      { company: 'Litware', daysAgo: 7 },
    ],
  );
});
