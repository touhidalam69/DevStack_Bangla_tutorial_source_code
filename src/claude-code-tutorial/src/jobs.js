import { readFile } from 'node:fs/promises';

export async function loadJobs(path = 'data/jobs.json') {
  return JSON.parse(await readFile(path, 'utf8'));
}

export function byStatus(jobs, status) {
  return jobs.filter((job) => job.status === status);
}

export function formatJob(job) {
  return [
    job.company.padEnd(10),
    job.role.padEnd(22),
    job.status.padEnd(10),
    job.appliedOn,
  ].join(' ');
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// `today` is a Date; only its local calendar date matters. Both dates become
// UTC midnight of their calendar day, so daysAgo is a whole number of calendar
// days regardless of the time of day, timezone or DST.
export function followUps(jobs, today, minDays = 7) {
  const todayDay = Date.UTC(
    today.getFullYear(), today.getMonth(), today.getDate());
  return jobs
    .filter((job) => job.status === 'Applied')
    .map((job) => {
      const daysAgo = (todayDay - Date.parse(job.appliedOn)) / MS_PER_DAY;
      return { ...job, daysAgo };
    })
    .filter((job) => job.daysAgo >= minDays)
    .sort((a, b) => b.daysAgo - a.daysAgo);
}
