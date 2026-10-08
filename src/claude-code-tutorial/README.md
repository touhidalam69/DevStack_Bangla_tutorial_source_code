<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# Claude Code Tutorial (Bangla): The Agent Said Done, My Test Said Fail

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/claude-code-tutorial/source.zip) ![Node.js](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=white)

> Source code for **Claude Code Tutorial Bangla: AI Agent বললো Done, Test বললো Fail** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[All videos](../../README.md#videos)

Claude Code tutorial in Bangla: from install to CLAUDE.md, then a feature built by an AI agent in a real project. The agent said done, and a test I wrote beforehand said fail: why it happened, and how to prevent it.

## What you will learn

- What Claude Code is: the agent loop and tools
- Install (Windows, macOS, Linux), which account you need, the price
- Plan mode and permission modes (Shift+Tab)
- CLAUDE.md with /init, and what to put in it
- A feature from one prompt, and the agent's own test
- Checking it with your own test: a real UTC+6 bug
- Fixing the root cause with a failing test
- Rules in CLAUDE.md, a new session that follows them, and a commit
- Esc, /rewind, /clear, /context, and prompts that can be checked

## jobtrack-cli

Track your job applications from the terminal.

```
npm start              # list all applications
npm start status Offer # only one status
npm test               # run the tests
```

Data lives in `data/jobs.json`.

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/claude-code-tutorial/source.zip) (14 files).

```
claude-code-tutorial/
├── data/
│   └── jobs.json
├── sessions/
│   ├── 1-s1-ask.md
│   ├── 2-s2-init.md
│   ├── 3-s3-feature.md
│   ├── 4-s4-fix.md
│   └── 5-s5-review.md
├── src/
│   ├── cli.js
│   └── jobs.js
├── test/
│   ├── followups.test.js
│   └── jobs.test.js
├── .gitignore
├── CLAUDE.md
├── package.json
└── README.md
```

## Questions

Ask in the comments of the video, in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlist on [DevStack Bangla](https://www.youtube.com/@devstackbangla): AI for Developers | Bangla (Claude Code, MCP, AI Agent, RAG).
