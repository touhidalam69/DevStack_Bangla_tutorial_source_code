import { test } from 'node:test';
import assert from 'node:assert/strict';
import { followUpDate, daysLeft, type Job } from './jobs.ts';

const job: Job = {
  company: 'Contoso',
  status: 'Applied',
  applied: '2026-10-28',
};

test('follow-up is 7 days after applying', () => {
  assert.equal(followUpDate(job).toString(), '2026-11-04');
});

test('days left counts from today', () => {
  const today = Temporal.PlainDate.from('2026-10-30');
  assert.equal(daysLeft(today, followUpDate(job)), 5);
});
