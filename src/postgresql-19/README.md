<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# PostgreSQL vs SQL Server: PostgreSQL 19 New Features, REPACK, Faster Foreign Keys

[![Watch on YouTube](https://img.shields.io/badge/Watch%20on%20YouTube-FF0000?logo=youtube&logoColor=white)](https://youtu.be/fdoshftPkZw) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/postgresql-19/source.zip)

> Source code for **PostgreSQL vs SQL Server বাংলায়: PostgreSQL 19 New Features, REPACK** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[All videos](../../README.md#videos)

PostgreSQL vs SQL Server with PostgreSQL 19's new features: the same jobs run on both databases. Explained in Bangla with English subtitles.
REPACK (CONCURRENTLY) takes a 797 MB table to 80 MB without blocking a single read or write.

## PostgreSQL 19: REPACK, faster foreign keys, and the same jobs on SQL Server

The scripts from the video. Everything here was run on PostgreSQL 19, PostgreSQL 18 (for the comparison) and
SQL Server 2025.

### What you need

- Docker (for PostgreSQL 19 and 18)
- Optional: SQL Server 2022 or later with `sqlcmd`, for the scripts in `sql/mssql/`

### Start the databases

```
docker compose -p pg19demo up -d
```

PostgreSQL 19 listens on port 5434 and PostgreSQL 18 on 5435 (user `postgres`, password `demo`, database `shop`).

Run a script on PostgreSQL 19:

```
docker compose -p pg19demo exec -T pg19 psql -U postgres -d shop -f - < sql/01-setup.sql
```

Use `pg18` in place of `pg19` for PostgreSQL 18.

### The scripts, in the video's order

| Script | What it shows |
| --- | --- |
| `sql/01-setup.sql` | 10,000 customers and 5 million orders (about 800 MB; it takes a minute) |
| `sql/02-bloat.sql` | deletes 9 of 10 orders, then `VACUUM`: the table stays the same size |
| `watch.sh` | plays the app while maintenance runs: reads and updates one order every 0.25 s and prints the lock |
| `sql/03-fk-bench.sql` | a 2 million row insert with and without a foreign key; run it on 18 and on 19 |
| `sql/04-get-or-create.sql` | `INSERT ... ON CONFLICT DO SELECT ... RETURNING` |
| `sql/05-fill-forward.sql` | `last_value(...) IGNORE NULLS` |
| `sql/mssql/*.sql` | the same three jobs on SQL Server |

### Locking: VACUUM FULL against REPACK (CONCURRENTLY)

`watch.sh` runs inside the container. Rebuild the bloat before each run (`01-setup.sql`, then `02-bloat.sql`).

```
docker compose -p pg19demo exec -T pg19 bash -s "VACUUM FULL orders" < watch.sh
docker compose -p pg19demo exec -T pg19 bash -s "REPACK (CONCURRENTLY) orders" < watch.sh
```

With `VACUUM FULL` every read and write is blocked until it finishes. With `REPACK (CONCURRENTLY)` they keep
working, and the table ends up the same small size.

### SQL Server

```
sqlcmd -S localhost -E -Q "CREATE DATABASE ShopDemo"
sqlcmd -S localhost -E -d ShopDemo -W -i sql/mssql/01-bloat.sql
```

`ALTER INDEX ... REBUILD WITH (ONLINE = ON)` needs Enterprise or Developer edition.

### Clean up

```
docker compose -p pg19demo down -v
sqlcmd -S localhost -E -Q "DROP DATABASE ShopDemo"
```

The timings in the video are from one PC (an i3-7100 with 20 GB of RAM). Yours will differ; the ratio is the point.

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/postgresql-19/source.zip) (14 files).

```
postgresql-19/
├── sql/
│   ├── mssql/ (3 files)
│   ├── 01-setup.sql
│   ├── 02-bloat.sql
│   ├── 03-fk-bench.sql
│   ├── 04-get-or-create.sql
│   ├── 05-fill-forward.sql
│   ├── 06-not-in-19.sql
│   ├── reader.sql
│   └── writer.sql
├── docker-compose.yml
├── README.md
└── watch.sh
```

## Questions

Ask in the comments of [the video](https://youtu.be/fdoshftPkZw), in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlist on [DevStack Bangla](https://www.youtube.com/@devstackbangla): SQL Server & PostgreSQL.
