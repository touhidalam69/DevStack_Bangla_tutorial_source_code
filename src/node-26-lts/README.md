<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# Node.js 26 LTS in Bangla: Temporal, Running TypeScript and an Upgrade Guide

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/node-26-lts/source.zip) ![Node.js](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=white)

> Source code for **Node.js 26 LTS বাংলায়: Temporal, TypeScript Run আর Upgrade Guide** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[All videos](../../README.md#videos)

What is new in Node.js 26 LTS, with real code: the Temporal date API on by default, running TypeScript without a build, the built-in test runner, the permission model, and what to check before you upgrade. Node.js 26 enters Active LTS on October 28, 2026 and is supported until April 30, 2029.

## Node.js 26 LTS: what's new, with real code

DevStack Bangla's Node.js 26 video. A tiny job-application follow-up helper, written in TypeScript and run by
Node.js 26 directly, with no build step and no test framework installed:

- `src/old-date.js`: the classic `Date` bugs (months start at 0, and `Date` objects change in place)
- `src/follow-up.ts`, `src/jobs.ts`: the same follow-up dates with the Temporal API, which Node.js 26 turns on by default
- `src/interview.ts`: a 10:00 AM interview in Dhaka, in Toronto's time zone
- `src/month-end.ts`: January 31 plus one month, with `Date` and with Temporal
- `src/total.ts`: Node.js runs TypeScript but never checks its types; `tsc --noEmit` does
- `src/jobs.test.ts`: tests with the built-in `node:test` runner
- `src/group.ts`: `Map.prototype.getOrInsertComputed()` from V8 14.6
- `src/report.ts`: the permission model (`--permission`, `--allow-fs-read`, `--allow-net`)

Needs Node.js 26 (tested with v26.12.1). `.nvmrc` says 26, so `nvm use` picks it.

### Run it

```
npm install
node src/old-date.js
npm start
node src/interview.ts
node src/month-end.ts
node src/total.ts 3
node src/group.ts
```

### Check the types and run the tests

```
npm run check
npm test
```

`npm install` only adds TypeScript (for `tsc --noEmit`) and the Node.js types; running the code needs neither.

### Try the permission model

```
node --permission src/report.ts
node --permission --allow-fs-read=. src/report.ts
node --permission --allow-fs-read=. --allow-net src/report.ts
```

The first stops at reading `notes.txt` (`ERR_ACCESS_DENIED`), the second at the network call, and the third runs
(`--allow-net` still prints an experimental warning in Node.js 26).

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/node-26-lts/source.zip) (16 files).

```
node-26-lts/
├── src/
│   ├── follow-up.ts
│   ├── group.ts
│   ├── interview.ts
│   ├── jobs.test.ts
│   ├── jobs.ts
│   ├── month-end.ts
│   ├── old-date.js
│   ├── report.ts
│   └── total.ts
├── .gitignore
├── .nvmrc
├── notes.txt
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## Questions

Ask in the comments of the video, in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlist on [DevStack Bangla](https://www.youtube.com/@devstackbangla): Node.js & TypeScript.
