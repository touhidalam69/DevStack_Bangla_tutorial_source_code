<!-- Written by tutorial-factory (npm run render). Change the video's demo/README.md or script.json instead. -->

# Minimal API vs Controller: Validation and ProblemDetails | ASP.NET Core Ep 3 (Bangla)

Source code for the video **Minimal API vs Controller Bangla: Validation আর ProblemDetails | Ep 3** on [DevStack Bangla](https://www.youtube.com/@devstackbangla).

Minimal API vs Controller in Bangla: the same ASP.NET Core Web API written both ways, the built-in validation in .NET 10, global exception handling with ProblemDetails, and API docs with Scalar.

**What you will learn**
- 4xx vs 5xx status codes, and why bad input should not be a 500
- ProblemDetails (RFC 9457), AddProblemDetails, UseExceptionHandler, UseStatusCodePages
- Minimal API vs Controller: the same JobsController, [ApiController], CreatedAtAction, MapControllers
- Which one when: what Microsoft's docs say
- .NET 10 Minimal API validation: AddValidation, Required, AllowedValues, your own error message
- Checking for database changes with dotnet ef migrations has-pending-model-changes
- OpenAPI docs with Scalar, TypedResults and ProducesValidationProblem

- Download: click [source.zip](source.zip) (43 files), then "Download raw file", and unzip it.
- Playlists: ASP.NET Core Web API + Angular Full Stack Project | Bangla; .NET & C# Tutorial | Bangla (ASP.NET Core, EF Core)

## Files in source.zip

```
jobtrack-ep03-minimal-api/controller-version/JobsController.cs
jobtrack-ep03-minimal-api/controller-version/Program.cs
jobtrack-ep03-minimal-api/dotnet-tools.json
jobtrack-ep03-minimal-api/jobtrack-web/.editorconfig
jobtrack-ep03-minimal-api/jobtrack-web/.gitignore
jobtrack-ep03-minimal-api/jobtrack-web/.prettierrc
jobtrack-ep03-minimal-api/jobtrack-web/.vscode/extensions.json
jobtrack-ep03-minimal-api/jobtrack-web/.vscode/launch.json
jobtrack-ep03-minimal-api/jobtrack-web/.vscode/tasks.json
jobtrack-ep03-minimal-api/jobtrack-web/angular.json
jobtrack-ep03-minimal-api/jobtrack-web/package-lock.json
jobtrack-ep03-minimal-api/jobtrack-web/package.json
jobtrack-ep03-minimal-api/jobtrack-web/public/favicon.ico
jobtrack-ep03-minimal-api/jobtrack-web/README.md
jobtrack-ep03-minimal-api/jobtrack-web/src/app/app.config.ts
jobtrack-ep03-minimal-api/jobtrack-web/src/app/app.css
jobtrack-ep03-minimal-api/jobtrack-web/src/app/app.html
jobtrack-ep03-minimal-api/jobtrack-web/src/app/app.routes.ts
jobtrack-ep03-minimal-api/jobtrack-web/src/app/app.spec.ts
jobtrack-ep03-minimal-api/jobtrack-web/src/app/app.ts
jobtrack-ep03-minimal-api/jobtrack-web/src/app/job.ts
jobtrack-ep03-minimal-api/jobtrack-web/src/index.html
jobtrack-ep03-minimal-api/jobtrack-web/src/main.ts
jobtrack-ep03-minimal-api/jobtrack-web/src/styles.css
jobtrack-ep03-minimal-api/jobtrack-web/tsconfig.app.json
jobtrack-ep03-minimal-api/jobtrack-web/tsconfig.json
jobtrack-ep03-minimal-api/jobtrack-web/tsconfig.spec.json
jobtrack-ep03-minimal-api/JobTrack.Api/appsettings.Development.json
jobtrack-ep03-minimal-api/JobTrack.Api/appsettings.json
jobtrack-ep03-minimal-api/JobTrack.Api/Data/JobApplication.cs
jobtrack-ep03-minimal-api/JobTrack.Api/Data/JobTrackDb.cs
jobtrack-ep03-minimal-api/JobTrack.Api/Data/SeedData.cs
jobtrack-ep03-minimal-api/JobTrack.Api/JobTrack.Api.csproj
jobtrack-ep03-minimal-api/JobTrack.Api/JobTrack.Api.http
jobtrack-ep03-minimal-api/JobTrack.Api/Migrations/20261008010654_InitialCreate.cs
jobtrack-ep03-minimal-api/JobTrack.Api/Migrations/20261008010654_InitialCreate.Designer.cs
jobtrack-ep03-minimal-api/JobTrack.Api/Migrations/20261008010814_AddAppliedOn.cs
jobtrack-ep03-minimal-api/JobTrack.Api/Migrations/20261008010814_AddAppliedOn.Designer.cs
jobtrack-ep03-minimal-api/JobTrack.Api/Migrations/JobTrackDbModelSnapshot.cs
jobtrack-ep03-minimal-api/JobTrack.Api/Program.cs
jobtrack-ep03-minimal-api/JobTrack.Api/Properties/launchSettings.json
jobtrack-ep03-minimal-api/JobTrack.slnx
jobtrack-ep03-minimal-api/README.md
```

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
