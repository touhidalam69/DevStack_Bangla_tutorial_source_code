<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# C# New Features: Records, Pattern Matching, Primary Constructors and C# 14 (old code vs modern)

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/modern-csharp-features/source.zip) ![.NET 10](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white)

> Source code for **C# New Features বাংলায়: Record, Pattern Matching, Primary Constructor** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[All videos](../../README.md#videos)

C# new features: old-style C# code rewritten with records, pattern matching, primary constructors, collection expressions and C# 14.
At the end we run both versions and diff them: the same output, with shorter and cleaner code. Explained in Bangla with English subtitles.

## Modern C# Features: old-style code rewritten with records, patterns and C# 14

DevStack Bangla. A small job tracker written twice: `Before/` in the old style, `After/` with modern C# features.
Both programs print exactly the same output.

Needs the .NET 10 SDK (made with SDK 10.0.401, C# 14). `After/` uses C# 14 features (`field`, extension members),
so it needs .NET 10 or newer.

### Run it

```
dotnet run --project Before
dotnet run --project After
```

Check that both print the same (Git Bash, macOS or Linux):

```
dotnet run --project Before > before.txt
dotnet run --project After > after.txt
diff before.txt after.txt && echo "Same output"
```

### Before and after

| File | Before | After | Feature (C# version) |
| --- | --- | --- | --- |
| `JobApplication.cs` | class with constructor, Equals, GetHashCode, `==`, `!=`, ToString (34 lines) | positional record (2 lines) | records (C# 9) |
| `NextStep.cs` | if-else chain | switch expression with property and relational patterns | patterns (C# 8, 9) |
| `FollowUpService.cs` | private readonly fields + constructor | primary constructor | primary constructors (C# 12) |
| `Program.cs` | `new List<JobApplication> { new JobApplication(...) }` | `[new(...), ...]` and `with` | collection expressions (C# 12), target-typed `new` (C# 9) |
| `Contact.cs` | backing field `_email` | `set => field = ...` | `field` keyword (C# 14) |
| `JobExtensions.cs` | extension methods `IsOpen()`, `OpenCount()` | `extension` blocks with properties `IsOpen`, `OpenCount` | extension members (C# 14) |

### The three quiz questions

Small file-based apps in `quiz/` (a .NET 10 feature: run one `.cs` file without a project). Guess first, then run:

```
cd quiz
dotnet run q1-equality.cs
```

| File | Question | Output |
| --- | --- | --- |
| `q1-equality.cs` | a record with a `List<string>`: are two records with the same data equal? | `False` |
| `q1-fix.cs` | compare the lists' items with `SequenceEqual` | `False` `True` |
| `q2-order.cs` | a general switch arm before a specific one | fails to build on purpose: `error CS8510` |
| `q2-if.cs` | the same order as an if-else chain | `Wait` (no error, wrong answer) |
| `q3-counter.cs` | a primary constructor parameter changed by a method | `7` |

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/modern-csharp-features/source.zip) (22 files).

```
modern-csharp-features/
├── After/
│   ├── After.csproj
│   ├── Contact.cs
│   ├── FollowUpService.cs
│   ├── JobApplication.cs
│   ├── JobExtensions.cs
│   ├── NextStep.cs
│   ├── Program.cs
│   └── Status.cs
├── Before/
│   ├── Before.csproj
│   ├── Contact.cs
│   ├── FollowUpService.cs
│   ├── JobApplication.cs
│   ├── JobExtensions.cs
│   ├── NextStep.cs
│   ├── Program.cs
│   └── Status.cs
├── quiz/
│   ├── q1-equality.cs
│   ├── q1-fix.cs
│   ├── q2-if.cs
│   ├── q2-order.cs
│   └── q3-counter.cs
└── ModernCSharp.slnx
```

## Questions

Ask in the comments of the video, in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlist on [DevStack Bangla](https://www.youtube.com/@devstackbangla): .NET & C# Tutorial | Bangla (ASP.NET Core, EF Core).
