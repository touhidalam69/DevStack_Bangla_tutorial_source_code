export type Status = 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export interface Job {
  company: string;
  status: Status;
  applied: string;
}

type Day = Temporal.PlainDate;

export function followUpDate(job: Job, days = 7): Day {
  return Temporal.PlainDate.from(job.applied).add({ days });
}

export function daysLeft(today: Day, due: Day): number {
  return today.until(due).days;
}
