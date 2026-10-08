<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# ASP.NET Core Web API with Angular | Full Stack Project Ep 1: Setup and CORS

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/jobtrack-ep01-setup/source.zip) ![.NET 10](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white) ![Angular 22](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)

> Source code for **ASP.NET Core Web API with Angular Bangla Tutorial | Full Stack Ep 1** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[All videos](../../README.md#videos) · [Ep 2: Entity Framework Core Tutorial: SQL Server CRUD →](../jobtrack-ep02-efcore)

ASP.NET Core Web API with Angular: a full stack project from scratch, explained in Bangla. In episode 1 we build a .NET 10 Web API and an Angular 22 app, make the first API call, and find the real cause of the CORS error and its fix.

## What you will learn

- The JobTrack series plan and architecture
- .NET 10 SDK and Node.js 24 LTS: which versions and why
- dotnet new sln (.slnx), dotnet new webapi, the order of Program.cs
- A minimal API endpoint, JSON, the OpenAPI document, the port in launchSettings
- Angular 22: ng new flags, HttpClient without provideHttpClient, signals, @if and @for
- The CORS error: what an origin is, the same-origin policy, proof with curl
- AddCors, WithOrigins, UseCors, preflight, and why not AllowAnyOrigin

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

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/jobtrack-ep01-setup/source.zip) (32 files).

```
jobtrack-ep01-setup/
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
│   ├── Properties/ (1 file)
│   ├── appsettings.Development.json
│   ├── appsettings.json
│   ├── JobTrack.Api.csproj
│   ├── JobTrack.Api.http
│   └── Program.cs
├── JobTrack.slnx
└── README.md
```

## Questions

Ask in the comments of the video, in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlists on [DevStack Bangla](https://www.youtube.com/@devstackbangla): ASP.NET Core Web API + Angular Full Stack Project | Bangla; .NET & C# Tutorial | Bangla (ASP.NET Core, EF Core); Angular Tutorial Bangla (Angular 22 Signals, Forms).
