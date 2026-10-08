<!-- Written by tutorial-factory (npm run render). Change the video's demo/README.md or script.json instead. -->

# Entity Framework Core Tutorial: SQL Server CRUD | Full Stack Ep 2 (Bangla)

Source code for the video **Entity Framework Core Tutorial Bangla: SQL Server CRUD | Ep 2** on [DevStack Bangla](https://www.youtube.com/@devstackbangla).

Entity Framework Core tutorial in Bangla: full CRUD for an ASP.NET Core Web API on SQL Server with EF Core 10 Code First, migrations, and a real AsNoTracking update bug.

**What you will learn**
- What Code First is, and how EF Core creates tables from C# classes
- EF Core 10 and LocalDB setup, dotnet package add, the dotnet-ef local tool
- The model, DbContext, MaxLength, the connection string
- Seed data with UseSeeding (the approach the EF Core docs recommend)
- dotnet ef migrations add and database update, Up and Down
- A second migration for a new column
- MapGroup, FirstOrDefaultAsync, Results.Created, ExecuteDeleteAsync
- Tracking vs AsNoTracking, and updating with FindAsync

- Download: click [source.zip](source.zip) (41 files), then "Download raw file", and unzip it.
- Playlists: ASP.NET Core Web API + Angular Full Stack Project | Bangla; .NET & C# Tutorial | Bangla (ASP.NET Core, EF Core); SQL Server & PostgreSQL Tutorial | Bangla

## Files in source.zip

```
jobtrack-ep02-efcore/dotnet-tools.json
jobtrack-ep02-efcore/jobtrack-web/.editorconfig
jobtrack-ep02-efcore/jobtrack-web/.gitignore
jobtrack-ep02-efcore/jobtrack-web/.prettierrc
jobtrack-ep02-efcore/jobtrack-web/.vscode/extensions.json
jobtrack-ep02-efcore/jobtrack-web/.vscode/launch.json
jobtrack-ep02-efcore/jobtrack-web/.vscode/tasks.json
jobtrack-ep02-efcore/jobtrack-web/angular.json
jobtrack-ep02-efcore/jobtrack-web/package-lock.json
jobtrack-ep02-efcore/jobtrack-web/package.json
jobtrack-ep02-efcore/jobtrack-web/public/favicon.ico
jobtrack-ep02-efcore/jobtrack-web/README.md
jobtrack-ep02-efcore/jobtrack-web/src/app/app.config.ts
jobtrack-ep02-efcore/jobtrack-web/src/app/app.css
jobtrack-ep02-efcore/jobtrack-web/src/app/app.html
jobtrack-ep02-efcore/jobtrack-web/src/app/app.routes.ts
jobtrack-ep02-efcore/jobtrack-web/src/app/app.spec.ts
jobtrack-ep02-efcore/jobtrack-web/src/app/app.ts
jobtrack-ep02-efcore/jobtrack-web/src/app/job.ts
jobtrack-ep02-efcore/jobtrack-web/src/index.html
jobtrack-ep02-efcore/jobtrack-web/src/main.ts
jobtrack-ep02-efcore/jobtrack-web/src/styles.css
jobtrack-ep02-efcore/jobtrack-web/tsconfig.app.json
jobtrack-ep02-efcore/jobtrack-web/tsconfig.json
jobtrack-ep02-efcore/jobtrack-web/tsconfig.spec.json
jobtrack-ep02-efcore/JobTrack.Api/appsettings.Development.json
jobtrack-ep02-efcore/JobTrack.Api/appsettings.json
jobtrack-ep02-efcore/JobTrack.Api/Data/JobApplication.cs
jobtrack-ep02-efcore/JobTrack.Api/Data/JobTrackDb.cs
jobtrack-ep02-efcore/JobTrack.Api/Data/SeedData.cs
jobtrack-ep02-efcore/JobTrack.Api/JobTrack.Api.csproj
jobtrack-ep02-efcore/JobTrack.Api/JobTrack.Api.http
jobtrack-ep02-efcore/JobTrack.Api/Migrations/20261008010654_InitialCreate.cs
jobtrack-ep02-efcore/JobTrack.Api/Migrations/20261008010654_InitialCreate.Designer.cs
jobtrack-ep02-efcore/JobTrack.Api/Migrations/20261008010814_AddAppliedOn.cs
jobtrack-ep02-efcore/JobTrack.Api/Migrations/20261008010814_AddAppliedOn.Designer.cs
jobtrack-ep02-efcore/JobTrack.Api/Migrations/JobTrackDbModelSnapshot.cs
jobtrack-ep02-efcore/JobTrack.Api/Program.cs
jobtrack-ep02-efcore/JobTrack.Api/Properties/launchSettings.json
jobtrack-ep02-efcore/JobTrack.slnx
jobtrack-ep02-efcore/README.md
```

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
