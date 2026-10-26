# jobtrack-cli

Track job applications from the terminal.
Node.js, ES modules, no dependencies.

## Commands

```
npm start [command] [arg]  # commands: list, status <S>, followups
npm test                   # run before you say a task is done
```

## Where things go

- Logic: pure, exported functions in `src/jobs.js`
  that take `today` (a Date) as a parameter.
- `src/cli.js` only dispatches commands and prints with `formatJob`.
- Every new function gets a test in `test/` with a fixed `today`.

## Team rules (not in the code)

- An Interview is stale after 10 or more days without contact:
  count calendar days from `lastContact`, not `appliedOn`.
  Recruiters here reply within a week; after 10 days we remind them.
- Show stale interviews oldest contact first,
  with "N days since contact".
- No new dependencies.
