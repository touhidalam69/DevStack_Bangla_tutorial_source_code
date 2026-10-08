# Session 3: s3-feature

A real Claude Code 2.1.293 session (claude -p, stream-json), printed as text. Long tool output is cut.

```text
[init] model=claude-opus-5-5 mode=auto v2.1.293 session=d73bb869-56ba-4f75-b007-228b12f98067

[tool_use Bash] {"command":"cat src/jobs.js src/cli.js && ls test && cat test/*.js && cat data/jobs.json package.json","description":"Read source, tests, and data"}
[tool_result] import { readFile } from 'node:fs/promises';

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
import { loadJobs, byStatus, formatJob } from './jobs.js';

const [command = 'list', arg] = process.argv.slice(2);
const jobs = await loadJobs();

if (command === 'list') {
  jobs.forEach((job) => console.log(formatJob(job)));
} else if (command === 'status') {
  byStatus(jobs, arg).forEach((job) => console.log(formatJob(job)));
} else {
  console.error(`Unknown command: ${command}`);
  process.exitCode = 1;
}
jobs.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { byStatus, formatJob } from '../src/jobs.js';

const jobs = [
  { company: 'Contoso', role: 'Dev', status: 'Applied', appliedOn: '2026-09-24' },
  { company: 'Fabrikam', role: 'Dev', status: 'Interview', appliedOn: '2026-09-28' },
];

test('byStatus keeps only matching jobs', () => {
  assert.deepEqual(byStatus(jobs, 'Interview'), [jobs[1]]);
});

test('formatJob shows company, role, status and date', () => {
  assert.match(formatJob(jobs[0]), /^Contoso\s+Dev\s+Applied\s+2026-09-24$/);
});
[
  { "company": "Contoso", "role": "Junior .NET Developer", "status": "Applied", "appliedOn": "2026-09-24" },
  { "company": "Fabrikam", "role": "Angular Developer", "status": "Interview", "appliedOn": "2026-09-28" },
  { "company": "Northwind", "role": "Full Stack Intern", "status": "Offer", "appliedOn": "2026-09-15" },
  { "company": "Litware", "role": "Intern", "status": "Applied", "appliedOn": "2026-10-01" },
  { "company": "Tailspin", "role": "Backend Developer", "status": "Applied", "appliedOn": "2026-10-06" }
]
{
  "name": "jobtrack-cli",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node src/cli.js",
    "test": "node --test"
  }
}

[tool_use Bash] {"command":"cat >> src/jobs.js <<'EOF'\n\nconst MS_PER_DAY = 24 * 60 * 60 * 1000;\n\n// `today` is a YYYY-MM-DD string; both dates parse as UTC midnight, so the\n// difference is a whole number of days regardless of local timezone or DST.\nexport function followUps(jobs, today, minDays = 7) {\n  return jobs\n    .filter((job) => job.status === 'Applied')\n    .map((job) => ({ ...job, daysAgo: (Date.parse(today) - Date.parse(job.appliedOn)) / MS_PER_DAY }))\n    .filter((job) => job.daysAgo >= minDays)\n    .sort((a, b) => b.daysAgo - a.daysAgo);\n}\nEOF\npython - <<'EOF'\np='src/cli.js'; s=open(p).read()\ns=s.replace(\"import { loadJobs, byStatus, formatJob } from './jobs.js';\",\"import { loadJobs, byStatus, formatJob, followUps } from './jobs.js';\")\ns=s.replace(\"\"\"} else {\n  console.error\"\"\",\"\"\"} else if (command === 'followups') {\n  const now = new Date();\n  const today = [now.getFullYear(), now.getMonth() + 1, now.getDate()]\n    .map((n) => String(n).padStart(2, '0'))\n    .join('-');\n  followUps(jobs, today).forEach((job) => console.log(`${formatJob(job)}  ${job.daysAgo} days ago`));\n} else {\n  console.error\"\"\")\nopen(p,'w').write(s)\np='test/jobs.test.js'; s=open(p).read()\ns=s.replace(\"import { byStatus, formatJob }\",\"import { byStatus, formatJob, followUps }\")\ns+=\"\"\"\ntest('followUps lists Applied jobs 7+ days old, oldest first, with daysAgo', () => {\n  const all = [\n    ...jobs,\n    { company: 'Litware', role: 'Intern', status: 'Applied', appliedOn: '2026-10-01' },\n    { company: 'Tailspin', role: 'Dev', status: 'Applied', appliedOn: '2026-10-02' },\n    { company: 'Northwind', role: 'Dev', status: 'Offer', appliedOn: '2026-09-01' },\n  ];\n  assert.deepEqual(\n    followUps(all, '2026-10-08').map(({ company, daysAgo }) => ({ company, daysAgo })),\n    [\n      { company: 'Contoso', daysAgo: 14 },\n      { company: 'Litware', daysAgo: 7 },\n    ],\n  );\n});\n\"\"\"\nopen(p,'w').write(s)\nEOF\nnpm test 2>&1 | tail -12; npm start followups","description":"Implement followups, add test, run tests and CLI"}
[tool_result] ✔ byStatus keeps only matching jobs (1.8024ms)
✔ formatJob shows company, role, status and date (0.3797ms)
✔ followUps lists Applied jobs 7+ days old, oldest first, with daysAgo (0.3773ms)
ℹ tests 3
ℹ suites 0
ℹ pass 3
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 125.8906

> jobtrack-cli@1.0.0 start
> node src/cli.js followups

Contoso    Junior .NET Developer  Applied    2026-09-24  14 days ago
Litware    Intern                 Applied    2026-10-01  7 days ago

[tool_use Bash] {"command":"sed -i 's|^npm start status Offer .*|&\\nnpm start followups            # Applied 7+ days ago, oldest first, with days since applying|' CLAUDE.md && sed -i 's|(`loadJobs`, `byStatus`, `formatJob`)|(`loadJobs`, `byStatus`, `formatJob`, `followUps`)|' CLAUDE.md && git diff --stat","description":"Document new command in CLAUDE.md"}
[tool_result] warning: in the working copy of 'CLAUDE.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/jobs.js', LF will be replaced by CRLF the next time Git touches it
 CLAUDE.md         |  3 ++-
 src/cli.js        |  8 +++++++-
 src/jobs.js       | 12 ++++++++++++
 test/jobs.test.js | 18 +++++++++++++++++-
 4 files changed, 38 insertions(+), 3 deletions(-)

[assistant]
I added the `followups` command. All 3 tests pass, including a new one for it, and it gives the right output when run on the real data:

```
$ npm start followups
Contoso    Junior .NET Developer  Applied    2026-09-24  14 days ago
Litware    Intern                 Applied    2026-10-01  7 days ago
```

Tailspin isn't listed because it was sent only 2 days ago. Fabrikam and Northwind aren't listed because they're no longer Applied.

**What changed:**
- **`src/jobs.js`**: `followUps(jobs, today)` keeps only Applied jobs, adds a `daysAgo` number to each, drops anything under 7 days, and sorts oldest first. `today` is a `YYYY-MM-DD` string, like `appliedOn`. Both dates are read as UTC midnight, so `daysAgo` is always a whole number and your timezone or daylight saving can't shift it. There's also an optional third argument, `minDays` (default 7), if you ever want a different cutoff.
- **`src/cli.js`**: added a new `followups` branch. It builds today's local date as `YYYY-MM-DD` and prints each job's usual line with `N days ago` added at the end.
- **`test/jobs.test.js`**: the new test covers the filtering, the exactly-7-days case, the sort order and the `daysAgo` values.
- **`CLAUDE.md`**: added the new command and function to the docs.

Nothing is committed yet.

[result] success turns=4 ms=27728 denials=[]
```
