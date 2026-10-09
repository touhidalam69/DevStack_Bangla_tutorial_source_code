<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# C# Interview Questions and Answers: 10 Guess-the-Output Questions (2026)

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/csharp-interview-questions/source.zip) ![.NET 10](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white)

> Source code for **C# Interview Questions and Answers বাংলায়: ১০টা Output প্রশ্ন (2026)** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[All videos](../../README.md#videos)

C# interview questions and answers: 10 questions, each answer checked by running the code.
For freshers and junior .NET developers preparing for interviews. Explained in Bangla with English subtitles.

## C# Interview Questions 2026: 10 questions with running code

DevStack Bangla. Ten "what does this print?" questions that come up in C# interviews. Each question is a small,
real program: guess the output, then run it and check.

Needs the .NET 10 SDK (made with SDK 10.0.401, C# 14). Question 10 uses a C# 14 feature, so it needs .NET 10 or newer.

### Run a question

```
cd InterviewQuestions
dotnet run -- 6
```

Without a number it lists the questions. Some questions have a second version that shows the fix: `5-fix`,
`6-fix` and `9-fix` (that one throws on purpose).

### The questions

| # | File | Topic | Output |
| --- | --- | --- | --- |
| 1 | `Questions/Q01.cs` | struct vs class: copying a value or a reference | `0 5` |
| 2 | `Questions/Q02.cs` | `==` vs `Equals` on `string` and `object` | `True` `False` `True` |
| 3 | `Questions/Q03.cs` | boxing copies the value | `5` |
| 4 | `Questions/Q04.cs` | a `List` passed to a method: change it vs replace it | `1,2` |
| 5 | `Questions/Q05.cs` | a lambda in a `for` loop captures one shared `i` | `333` (fix: `012`) |
| 6 | `Questions/Q06.cs` | LINQ deferred execution | `3` (with `ToList()`: `2`) |
| 7 | `Questions/Q07.cs` | record vs class equality | `True` `False` |
| 8 | `Questions/Q08.cs` | `return` inside `try` with `finally` | `finally 1` |
| 9 | `Questions/Q09.cs` | `int.MaxValue + 1` (unchecked by default) | `-2147483648` (with `checked`: `OverflowException`) |
| 10 | `Questions/Q10.cs` | C# 14 null-conditional assignment | `no profile` |

Open the file, guess first, then run it.

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/csharp-interview-questions/source.zip) (14 files).

```
csharp-interview-questions/
├── InterviewQuestions/
│   ├── Questions/ (10 files)
│   ├── InterviewQuestions.csproj
│   └── Program.cs
├── InterviewQuestions.slnx
└── README.md
```

## Questions

Ask in the comments of the video, in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlists on [DevStack Bangla](https://www.youtube.com/@devstackbangla): Interview Questions Bangla (C#, Angular, SQL, JavaScript); .NET & C# Tutorial | Bangla (ASP.NET Core, EF Core).
