<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# Context Engineering vs Prompt Engineering in Bangla: One AI Agent, Three Runs

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/context-engineering/source.zip) ![Node.js](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=white)

> Source code for **Context Engineering vs Prompt Engineering বাংলায়: একই Agent, তিনবার** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[All videos](../../README.md#videos)

Context engineering vs prompt engineering, tested: the same task, the same AI coding agent (Claude Code), three real runs. A short prompt and a polished 'senior developer' prompt both made the agent guess a 7-day rule; the same short prompt with a small CLAUDE.md got the team's 10-day rule right, with a test. Then: what is in a context window (measured with /context), why too much context hurts (context rot), and how to keep it lean.

## jobtrack-cli: context engineering experiment

Track your job applications from the terminal (Node.js, ES modules, no dependencies). This is the project from
DevStack Bangla's context engineering video, after the third of three Claude Code sessions.

The task was the same in all three: add a `stale` command that lists interviews nobody has followed up on.

| Run | Prompt | Context | `stale` threshold the agent chose | Team's rule (10 days) |
| --- | --- | --- | --- | --- |
| 1 | "Add a stale command that lists interviews that went stale." | the code only | 7 days | missed |
| 2 | a longer "senior Node.js developer, best practices" prompt | the code only | 7 days | missed |
| 3 | the same short prompt as run 1 | the code and `CLAUDE.md` | 10 days, from `lastContact` | followed |

`CLAUDE.md` holds what the code cannot tell: the commands, where things go, and the team's rules (an Interview is
stale after 10 days without contact). Claude Code loads it at the start of every session.

```
npm start              # list all applications
npm start status Offer # only one status
npm start followups    # Applied 7+ days ago
npm start stale        # Interviews with no contact for 10+ days
npm test               # run the tests
```

Data lives in `data/jobs.json`. Needs Node.js 22 or newer (tested on 26.12.1 and 24.21.0).

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/context-engineering/source.zip) (9 files).

```
context-engineering/
├── data/
│   └── jobs.json
├── src/
│   ├── cli.js
│   └── jobs.js
├── test/
│   ├── followups.test.js
│   ├── jobs.test.js
│   └── stale.test.js
├── CLAUDE.md
├── package.json
└── README.md
```

## Questions

Ask in the comments of the video, in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlist on [DevStack Bangla](https://www.youtube.com/@devstackbangla): AI for Developers.
