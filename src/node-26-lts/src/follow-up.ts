import { followUpDate, daysLeft, type Job } from './jobs.ts';

const jobs: Job[] = [
  { company: 'Contoso', status: 'Applied', applied: '2026-10-28' },
  { company: 'Fabrikam', status: 'Interview', applied: '2026-10-21' },
];

const today = Temporal.Now.plainDateISO('Asia/Dhaka');
for (const job of jobs) {
  const due = followUpDate(job);
  const left = daysLeft(today, due);
  console.log(`${job.company}: ${due}, ${left} days left`);
}
