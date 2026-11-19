<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# AI Agent Bangla Tutorial: Build Your Own Free, Local AI Agent (Node.js + Ollama)

[![Watch on YouTube](https://img.shields.io/badge/Watch%20on%20YouTube-FF0000?logo=youtube&logoColor=white)](https://youtu.be/VKRF0GqJJ18) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/ai-agent-local/source.zip) ![Node.js](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=white)

> Source code for **AI Agent Bangla Tutorial: নিজের AI Agent বানাই, Free আর Local** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[All videos](../../README.md#videos)

AI agent tutorial in Bangla, with English subtitles: build your own free, local AI agent in plain Node.js and Ollama, with no API key.
What an AI agent really is, how a model calls tools, and how the agent loop works, all shown with code that runs.

## A local AI agent in plain Node.js

From DevStack Bangla's AI Agent video. An AI agent built from scratch: a small model running on your own PC through
[Ollama](https://ollama.com), two tools, and one loop. No API key, no cloud, no npm package.

The agent answers questions about a student's October expenses (`expenses.json`). The model cannot see that file and
is not reliable at adding up many numbers, so it gets two tools:

| Tool | What it does |
| --- | --- |
| `get_expenses` | lists the October expenses in one category |
| `calculate` | evaluates a math expression; anything but numbers and `+ - * / ( ) .` is refused |

The model never runs a tool itself. It answers with a request (`tool_calls`: a name and arguments); `agent.mjs` runs
the tool, sends the result back, and asks again, until the model answers in text or 5 steps are used up.

### Files

| File | What it is |
| --- | --- |
| `chat.mjs` | one question to the model, no tools: a chatbot |
| `peek.mjs` | one question with the tools: prints the raw reply, so you can see `tool_calls` |
| `tools.mjs` | the tool definitions the model sees, and the code that runs them |
| `agent.mjs` | the agent loop |
| `check.mjs` | runs the agent several times and checks its answer against the real total |
| `tools.test.mjs` | unit tests for the tools (no model needed) |

### Run it

Needs Node.js 22 or newer and Ollama.

```
winget install Ollama.Ollama        # Windows; macOS and Linux: https://ollama.com/download
ollama pull qwen3:4b-instruct       # 2.5 GB, once

node chat.mjs "How much did I spend on food in October?"
node peek.mjs "How much did I spend on food in October?"
node agent.mjs "How much did I spend on food in October?"
node check.mjs 5                    # 5 runs, each answer checked
npm test                            # the tools' tests
```

Versions used in the video: Ollama 0.40.16, qwen3:4b-instruct, Node.js 24.21.0, on an i3-7100 with 20 GB RAM, CPU only
(about 30–40 s per question).

Why the instruct tag: plain `qwen3:4b` is a thinking model and writes a long chain of thought before every answer
(over two minutes for one question on that CPU).

The system message in `agent.mjs` matters: without it, the model never called `calculate` and added the numbers
itself, and got the total wrong in 11 runs in a row.

An older NVIDIA card can crash Ollama's GPU build ("the provided PTX was compiled with an unsupported toolchain"):
Ollama needs driver 570 or newer for compute capability 5.0–6.2. Update the driver, or run Ollama on the CPU with the
GPU hidden: `CUDA_VISIBLE_DEVICES=-1 ollama serve`.

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/ai-agent-local/source.zip) (9 files).

```
ai-agent-local/
├── agent.mjs
├── chat.mjs
├── check.mjs
├── expenses.json
├── package.json
├── peek.mjs
├── README.md
├── tools.mjs
└── tools.test.mjs
```

## Questions

Ask in the comments of [the video](https://youtu.be/VKRF0GqJJ18), in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlists on [DevStack Bangla](https://www.youtube.com/@devstackbangla): AI for Developers | Bangla (Claude Code, MCP, AI Agent, RAG); Node.js & TypeScript.
