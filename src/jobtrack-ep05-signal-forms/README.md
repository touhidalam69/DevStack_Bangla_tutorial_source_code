<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# Angular Signal Forms: Form Validation and an API Check | Full Stack Ep 5 (Bangla)

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/jobtrack-ep05-signal-forms/source.zip) ![.NET 10](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white) ![EF Core 10](https://img.shields.io/badge/EF%20Core-10-512BD4?logo=dotnet&logoColor=white) ![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927) ![Angular 22](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)

> Source code for **Angular Signal Forms Bangla: Form Validation আর API Check | Ep 5** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[← Ep 4: Angular Signals Tutorial: httpResource and computed](../jobtrack-ep04-signals) · [All videos](../../README.md#videos)

Angular Signal Forms in Bangla: forms without FormGroup in Angular 22, validation rules and error messages, submitting to the API, a duplicate check against the API while you type, and editing with the same form.

## JobTrack, Episode 5: Angular Signal Forms

DevStack Bangla's full-stack series: ASP.NET Core Web API (.NET 10) + Angular 22.
Episode 5 adds a form to add and edit jobs with Angular Signal Forms: validation rules with messages, submitting to
the API, a duplicate check against the API while you type (`validateHttp`), the API's own duplicate rule, and the
server's errors shown under the fields.

Needs the .NET 10 SDK, SQL Server LocalDB (installed with Visual Studio, or with SQL Server Express) and
Node.js 24 LTS for the Angular app.

### Create the database and run the API

```
dotnet tool restore
cd JobTrack.Api
dotnet ef database update
dotnet run
```

The API listens on `http://localhost:5032`.

LocalDB is Windows only. On another machine, point `ConnectionStrings:JobTrack` in
`JobTrack.Api/appsettings.json` at your own SQL Server.

### Run the Angular app

```
cd jobtrack-web
npm install
npx ng serve
```

Open http://localhost:4200. Type a company that is already in the list (Contoso) to see the duplicate check.

### What changed in this episode

| File | Change |
| --- | --- |
| `JobTrack.Api/Program.cs` | `GET /api/jobs/exists?company=...`; POST and PUT answer a company that is already in the list with a 400 ValidationProblem; routes with an id use `{id:int}` |
| `jobtrack-web/src/app/job.ts` | `appliedOn` on `Job`; `JobInput`, the shape the form edits |
| `jobtrack-web/src/app/job-form.ts` | the `JobForm` component: a `linkedSignal` model, `form()` with `required`, `maxLength`, `validate` and `validateHttp`, a submission action that POSTs or PUTs, and `toErrors()` for the API's 400 |
| `jobtrack-web/src/app/job-form.html` | `[formRoot]`, `[formField]` on every control, errors once a field is touched, Checking..., Saving..., Cancel |
| `jobtrack-web/src/app/job-form.css` | the form's styles |
| `jobtrack-web/src/app/app.ts`, `app.html`, `app.css` | the form next to the list, an Edit button per job, `editing` and `onSaved()` |

`controller-version/` is from Episode 3: the same API written as a controller, for comparison. It is not part of
the build and does not have this episode's duplicate rule.

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/jobtrack-ep05-signal-forms/source.zip) (46 files).

```
jobtrack-ep05-signal-forms/
├── controller-version/
│   ├── JobsController.cs
│   └── Program.cs
├── jobtrack-web/
│   ├── .vscode/ (3 files)
│   ├── public/ (1 file)
│   ├── src/ (13 files)
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
└── JobTrack.slnx
```

## Questions

Ask in the comments of the video, in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlists on [DevStack Bangla](https://www.youtube.com/@devstackbangla): ASP.NET Core Web API + Angular Full Stack Project | Bangla; Angular Tutorial Bangla (Angular 22 Signals, Forms).
