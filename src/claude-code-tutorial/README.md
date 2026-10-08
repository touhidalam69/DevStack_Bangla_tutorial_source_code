<!-- Written by tutorial-factory (npm run render). Change the video's demo/README.md or script.json instead. -->

# Claude Code Tutorial (Bangla): The Agent Said Done, My Test Said Fail

Source code for the video **Claude Code Tutorial Bangla: AI Agent বললো Done, Test বললো Fail** on [DevStack Bangla](https://www.youtube.com/@devstackbangla).

Claude Code tutorial in Bangla: from install to CLAUDE.md, then a feature built by an AI agent in a real project. The agent said done, and a test I wrote beforehand said fail: why it happened, and how to prevent it.

**What you will learn**
- What Claude Code is: the agent loop and tools
- Install (Windows, macOS, Linux), which account you need, the price
- Plan mode and permission modes (Shift+Tab)
- CLAUDE.md with /init, and what to put in it
- A feature from one prompt, and the agent's own test
- Checking it with your own test: a real UTC+6 bug
- Fixing the root cause with a failing test
- Rules in CLAUDE.md, a new session that follows them, and a commit
- Esc, /rewind, /clear, /context, and prompts that can be checked

- Download: click [source.zip](source.zip) (14 files), then "Download raw file", and unzip it.
- Playlist: AI for Developers | Bangla (Claude Code, MCP, AI Agent, RAG)

## Files in source.zip

```
claude-code-tutorial/.gitignore
claude-code-tutorial/CLAUDE.md
claude-code-tutorial/data/jobs.json
claude-code-tutorial/package.json
claude-code-tutorial/README.md
claude-code-tutorial/sessions/1-s1-ask.md
claude-code-tutorial/sessions/2-s2-init.md
claude-code-tutorial/sessions/3-s3-feature.md
claude-code-tutorial/sessions/4-s4-fix.md
claude-code-tutorial/sessions/5-s5-review.md
claude-code-tutorial/src/cli.js
claude-code-tutorial/src/jobs.js
claude-code-tutorial/test/followups.test.js
claude-code-tutorial/test/jobs.test.js
```

## jobtrack-cli

Track your job applications from the terminal.

```
npm start              # list all applications
npm start status Offer # only one status
npm test               # run the tests
```

Data lives in `data/jobs.json`.
