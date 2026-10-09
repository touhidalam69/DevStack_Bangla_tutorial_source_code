<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# SQL Interview Questions and Answers: JOIN, NULL, GROUP BY, Window Functions (2026)

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/sql-interview-questions/source.zip)

> Source code for **SQL Interview Questions and Answers Bangla: JOIN, NULL, GROUP BY, RANK** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[All videos](../../README.md#videos)

SQL interview questions and answers: 10 questions, each answer checked by running the query on SQL Server 2025.
For freshers and junior developers preparing for SQL interviews. Explained in Bangla with English subtitles.

## SQL Interview Questions: 10 queries with real results

DevStack Bangla. Ten SQL questions that come up in interviews: JOIN, NULL, GROUP BY and window functions.
Each question is a small query on a six-row sample database: guess the result, then run it.

Made with SQL Server 2025 (LocalDB 17.0.4025.3) and sqlcmd. Any SQL Server 2017 or newer gives the same results;
LocalDB and Express are free.

### Set up

Git Bash (macOS and Linux shells are the same):

```
export SQLCMDSERVER="(localdb)\MSSQLLocalDB"
sqlcmd -i setup.sql
export SQLCMDDBNAME=SqlInterview
sqlcmd -i data.sql
```

PowerShell:

```
$env:SQLCMDSERVER = "(localdb)\MSSQLLocalDB"
sqlcmd -i setup.sql
$env:SQLCMDDBNAME = "SqlInterview"
sqlcmd -i data.sql
```

With another server, set `SQLCMDSERVER` to its name (add `-U` and `-P` for SQL logins).

### Run a question

```
sqlcmd -i questions/q05.sql
sqlcmd -i questions/q05-fix.sql
```

### The questions

| # | File | Topic | Result |
| --- | --- | --- | --- |
| 1 | `q01.sql` | LEFT JOIN: how many rows? | 6 |
| 2 | `q02.sql`, `q02-fix.sql` | LEFT JOIN with a WHERE on the right table | 3 (Sales disappears); condition in `ON`: 4 |
| 3 | `q03.sql` | `COUNT(*)`, `COUNT(column)`, `COUNT(DISTINCT column)` | 6, 5, 2 |
| 4 | `q04.sql`, `q04-fix.sql` | `= NULL` vs `IS NULL` | 0, then 1 |
| 5 | `q05.sql`, `q05-fix.sql` | `NOT IN` with a NULL in the list | no rows; `NOT EXISTS`: 3 rows |
| 6 | `q06.sql`, `q06-where.sql` | `WHERE` vs `HAVING` | one row; an aggregate in `WHERE` is error 147 |
| 7 | `q07.sql` | a column that is neither grouped nor aggregated | error 8120 |
| 8 | `q08.sql`, `q08-fix.sql` | an alias in `WHERE` | error 207; the fix returns 3 rows |
| 9 | `q09.sql`, `q09-top.sql` | `RANK` vs `DENSE_RANK`; top earner per department | Karim: 3 and 2 |
| 10 | `q10.sql`, `q10-fix.sql` | second highest salary | `OFFSET 1` gives 90000 (wrong, a tie); the fixes give 70000 |

Open the file, guess first, then run it.

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/sql-interview-questions/source.zip) (20 files).

```
sql-interview-questions/
├── questions/
│   ├── q01.sql
│   ├── q02-fix.sql
│   ├── q02.sql
│   ├── q03.sql
│   ├── q04-fix.sql
│   ├── q04.sql
│   ├── q05-fix.sql
│   ├── q05.sql
│   ├── q06-where.sql
│   ├── q06.sql
│   ├── q07.sql
│   ├── q08-fix.sql
│   ├── q08.sql
│   ├── q09-top.sql
│   ├── q09.sql
│   ├── q10-fix.sql
│   └── q10.sql
├── data.sql
├── README.md
└── setup.sql
```

## Questions

Ask in the comments of the video, in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlists on [DevStack Bangla](https://www.youtube.com/@devstackbangla): Interview Questions Bangla (C#, Angular, SQL, JavaScript); SQL Server & PostgreSQL Tutorial | Bangla.
