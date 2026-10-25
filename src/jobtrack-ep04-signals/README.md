<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# Angular Signals Tutorial: httpResource and computed | Full Stack Ep 4 (Bangla)

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/jobtrack-ep04-signals/source.zip) ![.NET 10](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white) ![EF Core 10](https://img.shields.io/badge/EF%20Core-10-512BD4?logo=dotnet&logoColor=white) ![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927) ![Angular 22](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)

> Source code for **Angular Signals Tutorial Bangla: httpResource আর computed | Ep 4** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[← Ep 3: Minimal API vs Controller: Validation and ProblemDetails](../jobtrack-ep03-minimal-api) · [All videos](../../README.md#videos) · [Ep 5: Angular Signal Forms: Form Validation and an API Check →](../jobtrack-ep05-signal-forms)

Angular Signals tutorial in Bangla: why signals matter in Angular 22, a filter and counts with computed, and API data with httpResource instead of subscribe, with loading and errors.

## What you will learn

- Angular 22: zoneless and OnPush by default, and why a plain field does not update the screen
- signal, set, update, computed, without a component
- Signal or RxJS Observable, and toSignal
- A filter and counts with computed, lazy and memoized; computed or effect
- httpResource: API data without subscribe, a reactive URL
- value() throws in the error state: check hasValue()
- Loading and error states with isLoading, error, Retry and reload()
- The six resource statuses: idle, loading, reloading, resolved, error, local
- HttpClient (DELETE) for changes, then reload or update

## JobTrack, Episode 4: Angular Signals and httpResource

DevStack Bangla's full-stack series: ASP.NET Core Web API (.NET 10) + Angular 22.
Episode 4 is about the Angular app. It shows why Angular 22 (zoneless, OnPush by default) needs signals, adds a
status filter with counts using `computed`, loads the jobs with `httpResource` (loading, error and Retry states),
and deletes a job with `HttpClient`, then reloads the list.

Needs the .NET 10 SDK, SQL Server LocalDB (installed with Visual Studio, or with SQL Server Express) and
Node.js 24 LTS for the Angular app.

### Create the database and run the API

```
dotnet tool restore
cd JobTrack.Api
dotnet ef database update
dotnet run
```

The API listens on `http://localhost:5032`. The API does not change in this episode.

LocalDB is Windows only. On another machine, point `ConnectionStrings:JobTrack` in
`JobTrack.Api/appsettings.json` at your own SQL Server.

### Run the Angular app

```
cd jobtrack-web
npm install
npx ng serve
```

Open http://localhost:4200. Stop the API and press Retry to see the error state.

### What changed in this episode

| File | Change |
| --- | --- |
| `jobtrack-web/src/app/app.ts` | `httpResource` instead of `HttpClient.subscribe`; `filter` signal; `shown` and `counts` computed; `hasValue()` before `value()`; `remove()` with `HttpClient.delete`, then `jobs.reload()` |
| `jobtrack-web/src/app/app.html` | status filter buttons with counts, loading and error states with Retry, a Delete button per job |
| `jobtrack-web/src/app/app.css` | styles for the filter, Retry and Delete buttons |
| `jobtrack-web/src/app/app.spec.ts` | answers the `httpResource` request with `HttpTestingController`, so `whenStable()` resolves |
| `jobtrack-web/try/signals.mts` | `signal`, `set`, `update` and `computed` outside a component: `node try/signals.mts` (Node.js 24 runs it as is) |

`controller-version/` is from Episode 3: the same API written as a controller, for comparison. It is not part of
the build.

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/jobtrack-ep04-signals/source.zip) (44 files).

```
jobtrack-ep04-signals/
├── controller-version/
│   ├── JobsController.cs
│   └── Program.cs
├── jobtrack-web/
│   ├── .vscode/ (3 files)
│   ├── public/ (1 file)
│   ├── src/ (10 files)
│   ├── try/ (1 file)
│   ├── .editorconfig
│   ├── .gitignore
│   ├── .prettierrc
│   ├── angular.json
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   └── tsconfig.spec.json
├── JobTrack.Api/
│   ├── Data/ (3 files)
│   ├── Migrations/ (5 files)
│   ├── Properties/ (1 file)
│   ├── appsettings.Development.json
│   ├── appsettings.json
│   ├── JobTrack.Api.csproj
│   ├── JobTrack.Api.http
│   └── Program.cs
├── dotnet-tools.json
├── JobTrack.slnx
└── README.md
```

## Questions

Ask in the comments of the video, in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlists on [DevStack Bangla](https://www.youtube.com/@devstackbangla): ASP.NET Core Web API + Angular Full Stack Project | Bangla; Angular Tutorial Bangla (Angular 22 Signals, Forms).
