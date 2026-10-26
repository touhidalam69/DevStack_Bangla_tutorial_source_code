<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# Pagination in ASP.NET Core Web API: Sorting, Filtering, Angular | Full Stack Ep 6 (Bangla)

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/jobtrack-ep06-paging/source.zip) ![.NET 10](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white) ![EF Core 10](https://img.shields.io/badge/EF%20Core-10-512BD4?logo=dotnet&logoColor=white) ![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927) ![Angular 22](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)

> Source code for **Pagination in ASP.NET Core Web API: Sorting, Filtering, Angular | Ep 6** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[← Ep 5: Angular Signal Forms: Form Validation and an API Check](../jobtrack-ep05-signal-forms) · [All videos](../../README.md#videos)

Pagination in ASP.NET Core Web API in Bangla: server-side paging with EF Core Skip and Take, sorting and filtering, then a table and pager in Angular 22 with httpResource.

## JobTrack, Episode 6: Pagination, Sorting, Filtering

DevStack Bangla's full-stack series: ASP.NET Core Web API (.NET 10) + Angular 22.
Episode 6 moves paging, sorting and filtering to the server: `GET /api/jobs` returns one page with a total,
checks its query parameters, and the Angular app shows a sortable table with a pager.

Needs the .NET 10 SDK, SQL Server LocalDB (installed with Visual Studio, or with SQL Server Express) and
Node.js 24 LTS for the Angular app.

### Create the database and run the API

```
dotnet tool restore
cd JobTrack.Api
dotnet ef database drop -f    # only if you have the database from an earlier episode
dotnet ef database update     # creates it and seeds 22 jobs
dotnet run
```

The API listens on `http://localhost:5032`. The seed only runs on an empty table, so drop the old database once to
get the 22 jobs.

LocalDB is Windows only. On another machine, point `ConnectionStrings:JobTrack` in
`JobTrack.Api/appsettings.json` at your own SQL Server.

### Try the API

```
curl "localhost:5032/api/jobs?page=2&pageSize=5"
curl "localhost:5032/api/jobs?sort=company&desc=true"
curl "localhost:5032/api/jobs?status=Interview"
curl "localhost:5032/api/jobs?page=0"            # 400: page must be 1 or more
```

| Parameter | Default | Rule |
| --- | --- | --- |
| `page` | 1 | 1 or more |
| `pageSize` | 5 | 1 to 50 |
| `sort` | `appliedOn` | `company`, `status` or `appliedOn` |
| `desc` | `false` | `true` for newest or Z to A first |
| `status` | (all) | `Applied`, `Interview`, `Offer` or `Rejected` |

The answer is `{ "items": [...], "page": 1, "pageSize": 5, "total": 22 }`.

### Run the Angular app

```
cd jobtrack-web
npm install
npx ng serve
npx ng test --watch=false
```

Open http://localhost:4200. Click a column header to sort, Prev and Next to page, and a status to filter.

### What changed in this episode

| File | Change |
| --- | --- |
| `JobTrack.Api/Program.cs` | `GET /api/jobs` with `page`, `pageSize`, `sort`, `desc`, `status`: filter, count, sort (with `ThenBy(Id)`), then `Skip((page - 1) * pageSize).Take(pageSize)`; `[Range]` and `[AllowedValues]` on the parameters |
| `JobTrack.Api/Data/PagedResult.cs` | the page record: items, page, pageSize, total |
| `JobTrack.Api/Data/SeedData.cs` | 22 jobs with dates (a few on the same day) |
| `JobTrack.Api/JobTrack.Api.csproj` | EF Core 10.0.14; `System.Security.Cryptography.Pkcs` pinned to 10.0.14 (SqlClient still pulls a version with CVE-2026-84008) |
| `jobtrack-web/src/app/job.ts` | `Page<T>`, the shape of the API's answer |
| `jobtrack-web/src/app/app.ts` | signals `filter`, `sort`, `desc` and `page` (a `linkedSignal` that goes back to 1 when the filter or the sort changes); `httpResource` with `params`; `sortBy()` and `arrow()` |
| `jobtrack-web/src/app/app.html`, `app.css` | a table with clickable headers and a Prev / Next pager |
| `jobtrack-web/src/app/app.spec.ts` | the request's params, and the page reset |

`controller-version/` is from Episode 3: the same API written as a controller, for comparison. It is not part of
the build and does not have the paging.

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/jobtrack-ep06-paging/source.zip) (47 files).

```
jobtrack-ep06-paging/
├── controller-version/
│   ├── JobsController.cs
│   └── Program.cs
├── jobtrack-web/
│   ├── .vscode/ (3 files)
│   ├── public/ (1 file)
│   ├── src/ (13 files)
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
│   ├── Data/ (4 files)
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

More in the playlists on [DevStack Bangla](https://www.youtube.com/@devstackbangla): ASP.NET Core Web API + Angular Full Stack Project | Bangla; .NET & C# Tutorial | Bangla.
