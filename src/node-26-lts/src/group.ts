import type { Job } from './jobs.ts';

const jobs: Job[] = [
  { company: 'Contoso', status: 'Applied', applied: '2026-10-28' },
  { company: 'Fabrikam', status: 'Interview', applied: '2026-10-21' },
  { company: 'Litware', status: 'Applied', applied: '2026-10-25' },
  { company: 'Northwind', status: 'Offer', applied: '2026-10-02' },
];

const byStatus = new Map<string, string[]>();
for (const job of jobs) {
  byStatus.getOrInsertComputed(job.status, () => []).push(job.company);
}

console.log(byStatus);
