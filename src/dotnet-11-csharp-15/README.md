<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# C# 15 New Features: Union Types, Closed Classes and .NET 11 Runtime Async

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/dotnet-11-csharp-15/source.zip) ![.NET 11](https://img.shields.io/badge/.NET-11-512BD4?logo=dotnet&logoColor=white)

> Source code for **C# 15 New Features বাংলায়: Union Types, Closed Class, .NET 11** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[All videos](../../README.md#videos)

C# 15 new features: union types, closed classes, collection expression arguments, labeled break and .NET 11 runtime async, all run on the .NET 11 SDK. Explained in Bangla with English subtitles.
How a switch's underscore arm silently swallows a new case, and how a union makes the compiler name the missing case.

## .NET 11 and C# 15: union types, closed hierarchies and runtime async

DevStack Bangla. One small job-tracker service written twice, so you can see what C# 15 changes:

- `Before/`: .NET 10, C# 14. `SaveResult` is an abstract record with four results. The `switch` needs a `_` arm,
  and that arm silently swallows the new `Duplicate` result: the program prints "Something went wrong".
- `After/`: .NET 11, C# 15. `SaveResult` is a `union`. The `switch` has no `_` arm, and when a case is missing the
  build fails with `error CS8509` (the project turns that warning into an error).
- `trace/`: two file-based apps that print a live stack trace from three nested async methods, without and with
  runtime async.

Made with the .NET 11 SDK 11.0.100 (C# 15) and the .NET 10 SDK 10.0.401. `After/` and `trace/` need .NET 11;
`Before/` needs .NET 10.

### Run it

```
dotnet run --project Before
dotnet run --project After
```

`Before` prints:

```
Saved #4 Adatum
Job #42 not found
Company: Company is required
Something went wrong
```

`After` prints the same first three lines, then `contoso is already in your list`, followed by the union,
closed hierarchy, collection expression and labeled `break` examples.

To see the compiler catch a missing case, delete the `Duplicate d => ...` line in `After/Program.cs` and build:

```
error CS8509: The switch expression does not handle all possible values of its input type
(it is not exhaustive). For example, the pattern 'Duplicate' is not covered.
```

### Runtime async

```
cd trace
dotnet run trace.cs      # 13 frames: the compiler's async state machine shows up
dotnet run trace-on.cs   # 5 frames: only your methods
```

`trace-on.cs` turns runtime async on with `#:property Features=runtime-async=on`. In a project, the same switch is
`<Features>runtime-async=on</Features>` in the `.csproj`.

### Files

| File | What it shows |
| --- | --- |
| `Before/Results.cs` | the C# 14 way: an abstract record and four derived records |
| `After/Results.cs` | `public union SaveResult(Saved, NotFound, Invalid, Duplicate);` |
| `After/JobService.cs` | `Save()` returns a case record; the union conversion is implicit |
| `After/JobStatus.cs` | a `closed` record: only this assembly can derive from it |
| `After/Program.cs` | exhaustive `switch` expressions, the union's `Value`, JSON, `default`, `with(...)`, labeled `break` |
| `After/After.csproj` | `net11.0` and `<WarningsAsErrors>CS8509</WarningsAsErrors>` |
| `trace/trace.cs`, `trace/trace-on.cs` | live stack traces without and with runtime async |

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/dotnet-11-csharp-15/source.zip) (13 files).

```
dotnet-11-csharp-15/
├── After/
│   ├── After.csproj
│   ├── JobService.cs
│   ├── JobStatus.cs
│   ├── Program.cs
│   └── Results.cs
├── Before/
│   ├── Before.csproj
│   ├── JobService.cs
│   ├── Program.cs
│   └── Results.cs
├── trace/
│   ├── trace-on.cs
│   └── trace.cs
├── README.md
└── Unions.slnx
```

## Questions

Ask in the comments of the video, in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlist on [DevStack Bangla](https://www.youtube.com/@devstackbangla): .NET & C# Tutorial | Bangla (ASP.NET Core, EF Core).
