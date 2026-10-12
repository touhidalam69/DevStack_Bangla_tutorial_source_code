<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# What is Jev? TypeSafe's AI Model That Gives Decisions, Not Text (C# Demo)

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/what-is-jev/source.zip) ![.NET 10](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white)

> Source code for **What is Jev? TypeSafe-এর AI Model যা Text লেখে না, Decision দেয়** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[All videos](../../README.md#videos)

What is Jev? Jev is TypeSafe's new AI model that writes no text and returns typed decisions instead: Choice, Score and Noul, with probabilities and confidence.
What Jev is, how it differs from an LLM, and how to use it from C#.

## Jev ticket router (C#)

A small .NET 10 console app that asks **Jev**, TypeSafe's System One model, typed questions about a support
ticket and a bug report. It reads the typed answers (Choice, Score, Noul), checks the confidence with the formula
from TypeSafe's docs, and routes the ticket in code: act alone only when Jev is sure.

### Without an API key: the stub

Jev's API was in early access when this was made, so the video runs against `JevStub`, a tiny local server that
answers `POST /v1/systemone` with the **sample responses TypeSafe published in its docs** (`JevStub/samples/`, each
with its source page). No model runs in the stub: any other text gets `404`.

```bash
# terminal 1
cd JevStub
dotnet run                      # http://localhost:5199

# terminal 2
export TYPESAFE_BASE_URL=http://localhost:5199
export TYPESAFE_API_KEY=demo-key
dotnet run --project TicketRouter            # the support ticket
dotnet run --project TicketRouter -- bug     # the bug report
```

### With a real key

Create a key in the [TypeSafe console](https://console.typesafe.ai/), set `TYPESAFE_API_KEY`, and leave
`TYPESAFE_BASE_URL` unset: the same code then calls `https://api.typesafe.ai/v1/systemone`. Pricing on
2026-10-12: $0.042 per million input tokens, output tokens free ([Models](https://docs.typesafe.ai/models)).

### Files

| File | What it does |
| --- | --- |
| `TicketRouter/Jev.cs` | the answer records, the three question types (`Q.Choice`, `Q.Score`, `Q.Noul`) and `JevClient` |
| `TicketRouter/Confidence.cs` | confidence from the probabilities, formulas from [docs.typesafe.ai/confidence](https://docs.typesafe.ai/confidence) |
| `TicketRouter/Program.cs` | the two requests and the routing thresholds |
| `JevStub/Program.cs` | the local stand-in for the API |

Versions: .NET SDK 10.0.401, model `jev-1.13.0` (in the published samples).

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/what-is-jev/source.zip) (11 files).

```
what-is-jev/
├── JevStub/
│   ├── samples/ (2 files)
│   ├── appsettings.json
│   ├── JevStub.csproj
│   └── Program.cs
├── TicketRouter/
│   ├── Confidence.cs
│   ├── Jev.cs
│   ├── Program.cs
│   └── TicketRouter.csproj
├── JevDemo.slnx
└── README.md
```

## Questions

Ask in the comments of the video, in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlist on [DevStack Bangla](https://www.youtube.com/@devstackbangla): AI for Developers | Bangla (Claude Code, MCP, AI Agent, RAG).
