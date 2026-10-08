<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# Entity Framework Core Tutorial: SQL Server CRUD | Full Stack Ep 2 (Bangla)

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/jobtrack-ep02-efcore/source.zip) ![.NET 10](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white) ![EF Core 10](https://img.shields.io/badge/EF%20Core-10-512BD4?logo=dotnet&logoColor=white) ![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927) ![Angular 22](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)

> Source code for **Entity Framework Core Tutorial Bangla: SQL Server CRUD | Ep 2** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[← Ep 1: ASP.NET Core Web API with Angular](../jobtrack-ep01-setup) · [All videos](../../README.md#videos) · [Ep 3: Minimal API vs Controller: Validation and ProblemDetails →](../jobtrack-ep03-minimal-api)

Entity Framework Core tutorial in Bangla: full CRUD for an ASP.NET Core Web API on SQL Server with EF Core 10 Code First, migrations, and a real AsNoTracking update bug.

## What you will learn

- What Code First is, and how EF Core creates tables from C# classes
- EF Core 10 and LocalDB setup, dotnet package add, the dotnet-ef local tool
- The model, DbContext, MaxLength, the connection string
- Seed data with UseSeeding (the approach the EF Core docs recommend)
- dotnet ef migrations add and database update, Up and Down
- A second migration for a new column
- MapGroup, FirstOrDefaultAsync, Results.Created, ExecuteDeleteAsync
- Tracking vs AsNoTracking, and updating with FindAsync

## JobTrack, Episode 2: Entity Framework Core 10 + SQL Server

DevStack Bangla's full-stack series: ASP.NET Core Web API (.NET 10) + Angular 22.
Episode 2 moves the job list from an array in `Program.cs` into SQL Server with Entity Framework Core 10,
and adds create, read, update and delete endpoints.

Needs the .NET 10 SDK, SQL Server LocalDB (installed with Visual Studio, or with SQL Server Express) and
Node.js 24 LTS for the Angular app.

### Create the database

```
dotnet tool restore
cd JobTrack.Api
dotnet ef database update
```

`dotnet tool restore` installs `dotnet-ef` 10.0.12 from `dotnet-tools.json`. `database update` creates the
`JobTrack` database on `(localdb)\MSSQLLocalDB`, applies both migrations (`InitialCreate`, `AddAppliedOn`)
and adds three sample jobs (`Data/SeedData.cs`, run through `UseSeeding`).

LocalDB is Windows only. On another machine, point `ConnectionStrings:JobTrack` in
`JobTrack.Api/appsettings.json` at your own SQL Server.

### Run the API

```
dotnet run
```

It listens on `http://localhost:5032` (see `Properties/launchSettings.json`).

| Method | URL | What it does |
| --- | --- | --- |
| GET | `/api/jobs` | all jobs (no-tracking query) |
| GET | `/api/jobs/{id}` | one job, or 404 |
| POST | `/api/jobs` | add a job, 201 Created |
| PUT | `/api/jobs/{id}` | change a job, 204 No Content, or 404 |
| DELETE | `/api/jobs/{id}` | delete a job, 204 No Content, or 404 |

The calls from the video, in Windows PowerShell (`irm` is `Invoke-RestMethod`):

```
$api = 'http://localhost:5032/api/jobs'
irm $api/2
$j = '{"company":"Litware","role":"Intern","status":"Applied","appliedOn":"2026-10-08"}'
irm $api -Method Post -ContentType application/json -Body $j
$edit = '{"company":"Contoso","role":"Junior .NET Developer","status":"Rejected"}'
irm $api/1 -Method Put -ContentType application/json -Body $edit
irm $api/5 -Method Delete
irm $api | Format-Table
```

`JobTrack.Api/JobTrack.Api.http` has the same requests for Visual Studio, Rider or VS Code's REST Client.

### Run the Angular app

```
cd jobtrack-web
npm install
npx ng serve
```

Open http://localhost:4200. The page is the same as in episode 1; the data now comes from SQL Server.

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/jobtrack-ep02-efcore/source.zip) (41 files).

```
jobtrack-ep02-efcore/
├── jobtrack-web/
│   ├── .vscode/ (3 files)
│   ├── public/ (1 file)
│   ├── src/ (10 files)
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

More in the playlists on [DevStack Bangla](https://www.youtube.com/@devstackbangla): ASP.NET Core Web API + Angular Full Stack Project | Bangla; .NET & C# Tutorial | Bangla (ASP.NET Core, EF Core); SQL Server & PostgreSQL Tutorial | Bangla.
