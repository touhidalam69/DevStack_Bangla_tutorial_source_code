<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# Angular Interview Questions and Answers 2026: Signals, effect, OnPush (Angular 22)

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/angular-interview-questions/source.zip) ![Angular 22](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)

> Source code for **Angular Interview Questions and Answers 2026 বাংলায়: Signals, OnPush** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[All videos](../../README.md#videos)

Angular interview questions and answers: 10 questions on Angular 22, each answer checked by running the code.
Signals, computed vs effect, linkedSignal, OnPush and zoneless change detection, for junior and mid-level developers. Explained in Bangla with English subtitles.

## Angular Interview Questions 2026: 10 questions on Angular 22

DevStack Bangla. Ten Angular interview questions on signals, `effect()` and change detection. Each one is a small
piece of real code: guess the answer, then run it.

Made with Angular 22.2.2 (a new `ng new` app: zoneless, OnPush by default) and Node.js 24 LTS.

### Run it

```
cd angular-interview
npm install
```

Questions 1 to 3 are plain signal code. Node.js 24 runs the `.mts` files as they are:

```
node try/q01-computed.mts
node try/q02-mutate.mts
node try/q02-fix.mts
node try/q03-linked.mts
```

Questions 4 to 10 are components, one page each:

```
npx ng serve
```

Open http://localhost:4200 and the browser console (F12). The home page links to every question.

### The questions

| # | Topic | Code | Result |
| --- | --- | --- | --- |
| 1 | computed is lazy and memoized | `try/q01-computed.mts` | `calc` is printed once |
| 2 | Mutating an object inside a signal | `try/q02-mutate.mts`, fix `try/q02-fix.mts` | `Hi Rahim` twice; the fix (a new object) gives `Hi Karim` |
| 3 | linkedSignal | `try/q03-linked.mts` | `Air`, then `Sea` |
| 4 | When an effect runs | `/q4`, `q04-effect-order.ts` | `constructor done`, then `effect 2` |
| 5 | computed vs effect | `/q5`, `q05-derived.ts` | click Add one: `200 100` in the console |
| 6 | `effect()` in `ngOnInit` | `/q6`, fix `/q6-fix` | NG0203; the fix logs `count 0` |
| 7 | A new app's defaults | `npm ls zone.js` | no Zone.js; OnPush is the default |
| 8 | A plain field changed in `setTimeout` | `/q8`, fix `/q8-fix` | stays `count: 0` until you click Refresh; the signal version shows 5 by itself |
| 9 | OnPush child, mutated input | `/q9`, fix `/q9-fix` | stays `Hello, Rahim`; the fix (a new object) shows `Hello, Karim` |
| 10 | Reading a required input too early | `/q10-hidden`, fix `/q10` | NG0950 at runtime; reading it in `ngOnInit` logs `name is Nadia` |

The components are in `angular-interview/src/app/questions/`.

Question 10's first version does not compile. To see it, move the `console.log` in
`src/app/questions/greeting.ts` from `ngOnInit()` into a `constructor()` and run `npx ng build`: the build fails
with `NG8118: name is a required input and does not have a value in this context.`

`npx ng test` runs one test (the home page lists every question).

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/angular-interview-questions/source.zip) (38 files).

```
angular-interview-questions/
└── angular-interview/
    ├── .vscode/ (3 files)
    ├── public/ (1 file)
    ├── src/ (20 files)
    ├── try/ (4 files)
    ├── .editorconfig
    ├── .gitignore
    ├── .prettierrc
    ├── angular.json
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── tsconfig.app.json
    ├── tsconfig.json
    └── tsconfig.spec.json
```

## Questions

Ask in the comments of the video, in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlists on [DevStack Bangla](https://www.youtube.com/@devstackbangla): Interview Questions Bangla (C#, Angular, SQL, JavaScript); Angular Tutorial Bangla (Angular 22 Signals, Forms).
