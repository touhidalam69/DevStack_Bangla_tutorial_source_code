<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# MCP Server Tutorial: Build Your Own MCP Server in C# (.NET 10)

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/mcp-server-csharp/source.zip) ![.NET 10](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white)

> Source code for **MCP Server Tutorial Bangla: C# দিয়ে নিজের MCP Server বানান** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[All videos](../../README.md#videos)

MCP server tutorial: build your own MCP server in C# and .NET 10 and give an AI agent your own tools.
What MCP is, how to write a server, how to test it, and how to connect it to Claude Code, in one video. Explained in Bangla with English subtitles.

## JobTrackMcp: your own MCP server in C#

DevStack Bangla. A small Model Context Protocol (MCP) server written in C#. It gives an AI app two tools over
a list of job applications: `list_applications` and `update_status`.

Made with the .NET 10 SDK (10.0.401), the official C# SDK `ModelContextProtocol` 2.2.0 and the
`dotnet new mcpserver` template (Microsoft.McpServer.ProjectTemplates 1.2.1, preview). The server uses the
stdio transport: the AI app starts it as a child process and they talk JSON-RPC over stdin and stdout.

The data lives in memory (`JobStore.cs`), so every start begins with the same four applications. In your own
app, call your database or API there.

### Files

| File | What it does |
| --- | --- |
| `JobTrackMcp/Program.cs` | logs to stderr, registers `JobStore`, adds the MCP server with stdio and the tools |
| `JobTrackMcp/JobApplication.cs` | `JobStatus` enum and the `JobApplication` record |
| `JobTrackMcp/JobStore.cs` | four applications in memory, `All()` and `SetStatus()` under a lock |
| `JobTrackMcp/Tools/JobTools.cs` | the two tools; `McpException` so the AI can read the error |
| `.mcp.json` | Claude Code's project config, written by `claude mcp add` |

### Test it with MCP Inspector

Needs Node.js 22.19 or newer. From `JobTrackMcp/`:

```
npx @modelcontextprotocol/inspector --cli dotnet run --project . --method tools/list
npx @modelcontextprotocol/inspector --cli dotnet run --project . --method tools/call --tool-name update_status --tool-arg id=2 status=Offer
```

Without `--cli` the Inspector opens a web UI where you can pick a tool, fill its arguments and run it.

### Use it from Claude Code

`.mcp.json` in this folder was made with:

```
claude mcp add --scope project jobtrack -- dotnet run --project JobTrackMcp
```

Start `claude` in this folder, approve the `jobtrack` server, and ask for example: "Fabrikam just sent me an
offer! Update it. Then tell me which applications have had no reply for over a week." Claude Code asks before
it calls a tool for the first time.

VS Code and Visual Studio read the same kind of entry from `.vscode/mcp.json` or `.mcp.json` under a `servers`
key; see the Microsoft Learn quickstart "Create a minimal MCP server".

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/mcp-server-csharp/source.zip) (10 files).

```
mcp-server-csharp/
├── JobTrackMcp/
│   ├── .mcp/ (1 file)
│   ├── Tools/ (1 file)
│   ├── JobApplication.cs
│   ├── JobStore.cs
│   ├── JobTrackMcp.csproj
│   ├── Program.cs
│   └── README.md
├── .mcp.json
├── JobTrackMcp.slnx
└── README.md
```

## Questions

Ask in the comments of the video, in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlists on [DevStack Bangla](https://www.youtube.com/@devstackbangla): AI for Developers | Bangla (Claude Code, MCP, AI Agent, RAG); .NET & C# Tutorial | Bangla (ASP.NET Core, EF Core).
