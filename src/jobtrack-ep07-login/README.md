<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# ASP.NET Core Identity + Angular Login: JWT or Cookie? | Full Stack Ep 7 (Bangla)

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/jobtrack-ep07-login/source.zip) ![.NET 10](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white) ![EF Core 10](https://img.shields.io/badge/EF%20Core-10-512BD4?logo=dotnet&logoColor=white) ![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927) ![Angular 22](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)

> Source code for **ASP.NET Core Identity + Angular Login Bangla: JWT না Cookie? | Ep 7** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[← Ep 6: Pagination in ASP.NET Core Web API: Sorting, Filtering, Angular](../jobtrack-ep06-paging) · [All videos](../../README.md#videos)

ASP.NET Core Identity in Bangla: register and login in a .NET 10 Web API, and a login page, an auth guard and an HTTP interceptor in Angular 22. And the big question: in a browser app, a JWT in localStorage or an httpOnly cookie?

## JobTrack, Episode 7: Login with ASP.NET Core Identity

DevStack Bangla's full-stack series: ASP.NET Core Web API (.NET 10) + Angular 22.
Episode 7 adds users and a login. The API uses ASP.NET Core Identity's API endpoints with a cookie (httpOnly,
SameSite=Lax), not a JWT in localStorage: Microsoft's docs recommend cookies for browser apps because JavaScript
cannot read them. Every jobs endpoint needs a signed-in user, and deleting a job needs the Admin role
(401 without a cookie, 403 without the role). The Angular app has a login page, a route guard and an interceptor.

Needs the .NET 10 SDK, SQL Server LocalDB (installed with Visual Studio, or with SQL Server Express) and
Node.js 24 LTS for the Angular app.

### Create the database and run the API

```
dotnet tool restore
cd JobTrack.Api
dotnet user-secrets set "Seed:AdminPassword" "<a password of your own>"
dotnet ef database update
dotnet run
```

In Development the API creates an admin user, `admin@jobtrack.test`, with the password you put in user-secrets
(never in code or git). The password needs an uppercase and a lowercase letter, a digit and a symbol. Without the
secret, no admin is created. The API listens on `http://localhost:5032`.

LocalDB is Windows only. On another machine, point `ConnectionStrings:JobTrack` in
`JobTrack.Api/appsettings.json` at your own SQL Server.

### Try the API

```
api=localhost:5032/api
curl -i "$api/jobs"                                    # 401
curl "$api/auth/register" --json '{"email": "user@jobtrack.test", "password": "Jobs-2026"}'
curl -c cookies.txt "$api/auth/login?useCookies=true" \
  --json '{"email": "user@jobtrack.test", "password": "Jobs-2026"}'
curl -b cookies.txt "$api/jobs"                        # 200
curl -i -b cookies.txt -X DELETE "$api/jobs/22"        # 403: not an admin
```

`MapIdentityApi` adds `/api/auth/register`, `/login`, `/refresh`, `/manage/info` and more; `/api/auth/logout` is
our own endpoint.

### Run the Angular app

```
cd jobtrack-web
npm install
npx ng serve
npx ng test --watch=false
```

Open http://localhost:4200. `ng serve` sends every `/api` request to the API through `proxy.conf.json`, so the app
and the API share one origin and the cookie goes along without any CORS setting.

### What changed in this episode

| File | Change |
| --- | --- |
| `JobTrack.Api/Data/JobTrackDb.cs` | `IdentityDbContext<IdentityUser>` instead of `DbContext` |
| `JobTrack.Api/Migrations/*_AddIdentity.cs` | the AspNetUsers, AspNetRoles and other Identity tables |
| `JobTrack.Api/Program.cs` | `AddIdentityApiEndpoints`, `AddRoles`, the Admin policy, `MapIdentityApi` on `/api/auth`, a logout endpoint, `RequireAuthorization()` on the jobs and `RequireAuthorization("Admin")` on delete |
| `JobTrack.Api/Data/SeedData.cs` | `AddAdminAsync`: the Admin role and an admin user in Development |
| `jobtrack-web/proxy.conf.json`, `angular.json` | the dev server proxy for `/api` |
| `jobtrack-web/src/app/auth.ts` | `Auth`: who is signed in (asks `/api/auth/manage/info`), login, logout |
| `jobtrack-web/src/app/auth.guard.ts`, `app.routes.ts` | `authGuard` on the jobs page, `/login` route |
| `jobtrack-web/src/app/auth.interceptor.ts`, `app.config.ts` | a 401 from the API sends you to the login page |
| `jobtrack-web/src/app/login-page.*` | the login form (Signal Forms) |
| `jobtrack-web/src/app/jobs-page.*`, `app.*` | the list moved into `JobsPage`; `App` is the shell with the user and Sign out; a 403 on delete shows a message |
| `jobtrack-web/src/app/auth.guard.spec.ts`, `jobs-page.spec.ts` | guard tests, and the paging tests from Ep 6 |

`controller-version/` is from Episode 3: the same API written as a controller, for comparison. It is not part of
the build.

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/jobtrack-ep07-login/source.zip) (60 files).

```
jobtrack-ep07-login/
├── controller-version/
│   ├── JobsController.cs
│   └── Program.cs
├── jobtrack-web/
│   ├── .vscode/ (3 files)
│   ├── public/ (1 file)
│   ├── src/ (23 files)
│   ├── .editorconfig
│   ├── .gitignore
│   ├── .prettierrc
│   ├── angular.json
│   ├── package-lock.json
│   ├── package.json
│   ├── proxy.conf.json
│   ├── README.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   └── tsconfig.spec.json
├── JobTrack.Api/
│   ├── Data/ (4 files)
│   ├── Migrations/ (7 files)
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
