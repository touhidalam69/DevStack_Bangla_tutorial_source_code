# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm start                      # list all applications (node src/cli.js)
npm start status Offer         # filter by status (exact, case-sensitive match)
npm start followups            # Applied 7+ days ago, oldest first, with days since applying
npm test                       # run all tests with Node's built-in runner (node --test)
node --test test/jobs.test.js  # run one test file
node --test --test-name-pattern="byStatus"  # run tests whose name matches
```

No dependencies, build step, or linter. Requires a Node version with `node:test` and top-level `await` (ESM, `"type": "module"`).

## Architecture

- `src/jobs.js` holds all logic as pure, exported functions (`loadJobs`, `byStatus`, `formatJob`, `followUps`); tests import from here.
- `src/cli.js` is a thin dispatcher: reads `process.argv` as `[command = 'list', arg]`, loads jobs, and prints via `formatJob`. Unknown commands write to stderr and set `process.exitCode = 1`. New commands are added as another `else if` branch here, with the logic in `jobs.js`.
- `data/jobs.json` is the data store: an array of `{ company, role, status, appliedOn }` (`appliedOn` is `YYYY-MM-DD`). `loadJobs` defaults to the **relative** path `data/jobs.json`, so the CLI must be run from the repo root.
- `formatJob` produces fixed-width columns via `padEnd` (company 10, role 22, status 10); tests assert on this output with a regex.

## Rules

- `today` is always a Date. Count days by the local calendar date.
- Keep lines under 80 characters.
- Every new function gets a test in `test/`.
- Run `npm test` before you say a task is done.
