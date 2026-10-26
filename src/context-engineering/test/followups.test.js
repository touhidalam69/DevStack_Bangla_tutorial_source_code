import { test } from 'node:test';
import assert from 'node:assert/strict';
import { followUps } from '../src/jobs.js';

const jobs = [
  { company: 'Contoso', role: 'Dev',
    status: 'Applied', appliedOn: '2026-09-24' },
  { company: 'Fabrikam', role: 'Dev',
    status: 'Interview', appliedOn: '2026-09-28' },
  { company: 'Litware', role: 'Dev',
    status: 'Applied', appliedOn: '2026-10-01' },
  { company: 'Tailspin', role: 'Dev',
    status: 'Applied', appliedOn: '2026-10-06' },
];
// 8 Oct 2026, 12:30 AM on this PC (Dhaka, UTC+6)
const today = new Date(2026, 9, 8, 0, 30);

test('followUps: Applied for 7+ days, oldest first', () => {
  const names = followUps(jobs, today).map((job) => job.company);
  assert.deepEqual(names, ['Contoso', 'Litware']);
});

test('followUps: daysAgo counts calendar days', () => {
  const [contoso, litware] = followUps(jobs, today);
  assert.equal(contoso.daysAgo, 14);
  assert.equal(litware.daysAgo, 7);
});
