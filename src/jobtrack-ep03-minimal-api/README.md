<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# Minimal API vs Controller: Validation and ProblemDetails | ASP.NET Core Ep 3 (Bangla)

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/jobtrack-ep03-minimal-api/source.zip) ![.NET 10](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white) ![EF Core 10](https://img.shields.io/badge/EF%20Core-10-512BD4?logo=dotnet&logoColor=white) ![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927) ![Angular 22](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)

> Source code for **Minimal API vs Controller Bangla: Validation আর ProblemDetails | Ep 3** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[← Ep 2: Entity Framework Core Tutorial: SQL Server CRUD](../jobtrack-ep02-efcore) · [All videos](../../README.md#videos)

Minimal API vs Controller in Bangla: the same ASP.NET Core Web API written both ways, the built-in validation in .NET 10, global exception handling with ProblemDetails, and API docs with Scalar.

## What you will learn

- 4xx vs 5xx status codes, and why bad input should not be a 500
- ProblemDetails (RFC 9457), AddProblemDetails, UseExceptionHandler, UseStatusCodePages
- Minimal API vs Controller: the same JobsController, [ApiController], CreatedAtAction, MapControllers
- Which one when: what Microsoft's docs say
- .NET 10 Minimal API validation: AddValidation, Required, AllowedValues, your own error message
- Checking for database changes with dotnet ef migrations has-pending-model-changes
- OpenAPI docs with Scalar, TypedResults and ProducesValidationProblem

## JobTrack, Episode 3: Minimal API vs Controller, Validation and ProblemDetails

DevStack Bangla's full-stack series: ASP.NET Core Web API (.NET 10) + Angular 22.
Episode 3 stops the API from answering bad input with a 500 or saving it. It adds ProblemDetails and global
exception handling, compares the same API written as a controller, turns on .NET 10's built-in validation for
Minimal APIs, and adds an API reference page with Scalar.

Needs the .NET 10 SDK, SQL Server LocalDB (installed with Visual Studio, or with SQL Server Express) and
Node.js 24 LTS for the Angular app.

### Create the database and run the API

```
dotnet tool restore
cd JobTrack.Api
dotnet ef database update
dotnet run
```

The API listens on `http://localhost:5032`. The API reference (Scalar) is at http://localhost:5032/scalar/ and
the OpenAPI document at http://localhost:5032/openapi/v1.json (both only in the Development environment).

LocalDB is Windows only. On another machine, point `ConnectionStrings:JobTrack` in
`JobTrack.Api/appsettings.json` at your own SQL Server.

### What changed in this episode

| File | Change |
| --- | --- |
| `JobTrack.Api/Program.cs` | `AddProblemDetails`, `UseExceptionHandler`, `UseStatusCodePages`, `AddValidation`, `MapScalarApiReference`, `TypedResults.Created` and `ProducesValidationProblem` on POST |
| `JobTrack.Api/Data/JobApplication.cs` | `[Required]` on Company and Role, `[AllowedValues]` on Status (no database change: `dotnet ef migrations has-pending-model-changes` reports none) |
| `JobTrack.Api/JobTrack.Api.csproj` | `Scalar.AspNetCore` 2.17.14 |
| `controller-version/` | the same API as a controller (`JobsController.cs` and its `Program.cs`), shown in the video for comparison. Not part of the build: to try it, copy `JobsController.cs` into `JobTrack.Api/Controllers/` and use that `Program.cs`. |

### The calls from the video

They use `curl` in Git Bash (Windows), or any macOS or Linux terminal, and `jq` to format the JSON
(https://jqlang.org). In Windows PowerShell, `curl` is a different command; use `curl.exe` or Git Bash.

```
api=localhost:5032/api/jobs
banana='{"company":"","role":"Intern","status":"Banana"}'
waiting='{"company":"Tailspin","role":"QA","status":"Waiting for HR to reply"}'

curl -s --json "$banana" $api | jq     # 400: Company is required, Status not allowed
curl -s --json "$waiting" $api | jq    # 400: Status longer than 20 characters
curl -s $api/99 | jq                   # 404 as ProblemDetails
curl -i --json '{"company":"Tailspin","role":"QA","status":"Applied"}' $api   # 201 Created
```

`JobTrack.Api/JobTrack.Api.http` has the same requests for Visual Studio, Rider or VS Code's REST Client.

### Run the Angular app

```
cd jobtrack-web
npm install
npx ng serve
```

Open http://localhost:4200. The Angular app does not change in this episode.

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/jobtrack-ep03-minimal-api/source.zip) (43 files).

```
jobtrack-ep03-minimal-api/
├── controller-version/
│   ├── JobsController.cs
│   └── Program.cs
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

More in the playlists on [DevStack Bangla](https://www.youtube.com/@devstackbangla): ASP.NET Core Web API + Angular Full Stack Project | Bangla; .NET & C# Tutorial | Bangla (ASP.NET Core, EF Core).
