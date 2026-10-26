<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# Node.js REST API in Bangla: TypeScript, PostgreSQL and Drizzle ORM CRUD

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/node-rest-api-drizzle/source.zip) ![Node.js](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=white)

> Source code for **Node.js REST API Bangla: TypeScript, PostgreSQL আর Drizzle ORM CRUD** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[All videos](../../README.md#videos)

A complete Node.js REST API with TypeScript, PostgreSQL 18 (Docker) and Drizzle ORM: schema and SQL migrations, Express 5 routes, zod validation with field errors, a real PATCH bug (zod 4 partial() keeps defaults) and its fix, a type-safe status filter, and tests with node --test. Node 26 runs the .ts files directly.

## JobTrack API: Node.js, TypeScript, PostgreSQL and Drizzle ORM

A small REST API for tracking job applications, from DevStack Bangla's Node.js REST API video. Node.js 26 runs
the TypeScript files directly (no build step), Express 5 serves the routes, zod validates every input, Drizzle ORM
talks to PostgreSQL 18, and drizzle-kit writes the SQL migrations.

| Method | Path | What it does |
| --- | --- | --- |
| GET | `/jobs?status=Interview` | all jobs, newest first; `status` is optional and checked |
| GET | `/jobs/:id` | one job, or 404 |
| POST | `/jobs` | add a job (201); status defaults to `Applied` |
| PATCH | `/jobs/:id` | change only the fields you send |
| DELETE | `/jobs/:id` | 204, or 404 |

Bad input gets a 400 with the message for each field.

### Run it

Needs Node.js 26 (`.nvmrc`) and Docker.

```
cp .env.example .env
docker compose up -d          # PostgreSQL 18 on port 5433
npm install
npx drizzle-kit migrate       # creates the jobs table
npm run dev                   # http://localhost:4000
```

The passwords in `compose.yaml` and `.env.example` are for local testing only.

### Check and test

```
npm run check                 # tsc --noEmit: Node runs TypeScript but does not check types
npm test                      # node --test: the validation rules, no database needed
```

After changing `src/db/schema.ts`, run `npx drizzle-kit generate --name <what-changed>` and then
`npx drizzle-kit migrate`.

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/node-rest-api-drizzle/source.zip) (18 files).

```
node-rest-api-drizzle/
├── drizzle/
│   ├── meta/ (2 files)
│   └── 0000_create_jobs.sql
├── src/
│   ├── db/ (2 files)
│   ├── app.ts
│   ├── server.ts
│   └── validation.ts
├── test/
│   └── validation.test.ts
├── .env.example
├── .gitignore
├── .nvmrc
├── compose.yaml
├── drizzle.config.ts
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## Questions

Ask in the comments of the video, in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlist on [DevStack Bangla](https://www.youtube.com/@devstackbangla): Node.js & TypeScript.
