import { loadJobs, byStatus, formatJob, followUps, staleInterviews } from './jobs.js';

const [command = 'list', arg] = process.argv.slice(2);
const jobs = await loadJobs();

if (command === 'list') {
  jobs.forEach((job) => console.log(formatJob(job)));
} else if (command === 'status') {
  byStatus(jobs, arg).forEach((job) => console.log(formatJob(job)));
} else if (command === 'followups') {
  followUps(jobs, new Date()).forEach((job) => {
    console.log(`${formatJob(job)}  ${job.daysAgo} days ago`);
  });
} else if (command === 'stale') {
  staleInterviews(jobs, new Date()).forEach((job) => {
    console.log(`${formatJob(job)}  ${job.daysSinceContact} days since contact`);
  });
} else {
  console.error(`Unknown command: ${command}`);
  process.exitCode = 1;
}
