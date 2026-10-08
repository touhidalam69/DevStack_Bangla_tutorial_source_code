<!-- Written by tutorial-factory (npm run render). Change the video's demo/README.md or script.json instead. -->

# ASP.NET Core Web API with Angular | Full Stack Project Ep 1: Setup and CORS

Source code for the video **ASP.NET Core Web API with Angular Bangla Tutorial | Full Stack Ep 1** on [DevStack Bangla](https://www.youtube.com/@devstackbangla).

ASP.NET Core Web API with Angular: a full stack project from scratch, explained in Bangla. In episode 1 we build a .NET 10 Web API and an Angular 22 app, make the first API call, and find the real cause of the CORS error and its fix.

**What you will learn**
- The JobTrack series plan and architecture
- .NET 10 SDK and Node.js 24 LTS: which versions and why
- dotnet new sln (.slnx), dotnet new webapi, the order of Program.cs
- A minimal API endpoint, JSON, the OpenAPI document, the port in launchSettings
- Angular 22: ng new flags, HttpClient without provideHttpClient, signals, @if and @for
- The CORS error: what an origin is, the same-origin policy, proof with curl
- AddCors, WithOrigins, UseCors, preflight, and why not AllowAnyOrigin

- Download: click [source.zip](source.zip) (32 files), then "Download raw file", and unzip it.
- Playlists: ASP.NET Core Web API + Angular Full Stack Project | Bangla; .NET & C# Tutorial | Bangla (ASP.NET Core, EF Core); Angular Tutorial Bangla (Angular 22 Signals, Forms)

## Files in source.zip

```
jobtrack-ep01-setup/jobtrack-web/.editorconfig
jobtrack-ep01-setup/jobtrack-web/.gitignore
jobtrack-ep01-setup/jobtrack-web/.prettierrc
jobtrack-ep01-setup/jobtrack-web/.vscode/extensions.json
jobtrack-ep01-setup/jobtrack-web/.vscode/launch.json
jobtrack-ep01-setup/jobtrack-web/.vscode/tasks.json
jobtrack-ep01-setup/jobtrack-web/angular.json
jobtrack-ep01-setup/jobtrack-web/package-lock.json
jobtrack-ep01-setup/jobtrack-web/package.json
jobtrack-ep01-setup/jobtrack-web/public/favicon.ico
jobtrack-ep01-setup/jobtrack-web/README.md
jobtrack-ep01-setup/jobtrack-web/src/app/app.config.ts
jobtrack-ep01-setup/jobtrack-web/src/app/app.css
jobtrack-ep01-setup/jobtrack-web/src/app/app.html
jobtrack-ep01-setup/jobtrack-web/src/app/app.routes.ts
jobtrack-ep01-setup/jobtrack-web/src/app/app.spec.ts
jobtrack-ep01-setup/jobtrack-web/src/app/app.ts
jobtrack-ep01-setup/jobtrack-web/src/app/job.ts
jobtrack-ep01-setup/jobtrack-web/src/index.html
jobtrack-ep01-setup/jobtrack-web/src/main.ts
jobtrack-ep01-setup/jobtrack-web/src/styles.css
jobtrack-ep01-setup/jobtrack-web/tsconfig.app.json
jobtrack-ep01-setup/jobtrack-web/tsconfig.json
jobtrack-ep01-setup/jobtrack-web/tsconfig.spec.json
jobtrack-ep01-setup/JobTrack.Api/appsettings.Development.json
jobtrack-ep01-setup/JobTrack.Api/appsettings.json
jobtrack-ep01-setup/JobTrack.Api/JobTrack.Api.csproj
jobtrack-ep01-setup/JobTrack.Api/JobTrack.Api.http
jobtrack-ep01-setup/JobTrack.Api/Program.cs
jobtrack-ep01-setup/JobTrack.Api/Properties/launchSettings.json
jobtrack-ep01-setup/JobTrack.slnx
jobtrack-ep01-setup/README.md
```

## JobTrack, Episode 1: Setup

DevStack Bangla's full-stack series: ASP.NET Core Web API (.NET 10) + Angular 22.

Needs the .NET 10 SDK and Node.js 24 LTS.

### Run the API

```
cd JobTrack.Api
dotnet run
```

It prints the address it listens on (`http://localhost:5032` here; the template picks a random port,
see `JobTrack.Api/Properties/launchSettings.json`). Open `/api/jobs` to see the JSON.

### Run the Angular app

```
cd jobtrack-web
npm install
npx ng serve
```

Open http://localhost:4200. If your API port is different, change it in `jobtrack-web/src/app/app.ts`.

### CORS

The API allows only `http://localhost:4200` (`AddCors` + `UseCors("AngularDev")` in `Program.cs`).
