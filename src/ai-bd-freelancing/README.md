<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# Will AI Cut Bangladesh's IT and Freelancing Jobs? Real Data and a Real Test

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/ai-bd-freelancing/source.zip) ![Node.js](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=white)

> Source code for **AI কি বাংলাদেশের IT আর freelancing চাকরি কমাবে?** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[All videos](../../README.md#videos)

Freelancing future in Bangladesh: will AI really cut our IT and freelancing work? No fear, just real data and a real AI test.

## A freelance gig, done by an AI agent

The demo from the DevStack Bangla video on AI and Bangladesh's IT and freelancing jobs.

A Dhaka gadget shop sends six invoices (`invoices/`) and a short brief (`brief.txt`): one CSV with the date,
invoice number, customer and total. That is a typical small data-entry gig.

- `invoices.csv` is what Claude Code (2.1.295, `claude -p` with the brief as the prompt) wrote in about 18 seconds.
- `check.mjs` is the client's own check, written before the session: the shop's dates are day/month/year, invoice
  1042 has a 10% discount, and one customer's name has a comma in it.

Run the check (Node.js 22 or newer, no packages):

```
npm test
```

It prints one line per invoice and `all 6 rows right`.

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/ai-bd-freelancing/source.zip) (11 files).

```
ai-bd-freelancing/
├── invoices/
│   ├── inv-1041.txt
│   ├── inv-1042.txt
│   ├── inv-1043.txt
│   ├── inv-1044.txt
│   ├── inv-1045.txt
│   └── inv-1046.txt
├── brief.txt
├── check.mjs
├── invoices.csv
├── package.json
└── README.md
```

## Questions

Ask in the comments of the video, in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlists on [DevStack Bangla](https://www.youtube.com/@devstackbangla): Programming Career & Tech Trends | Bangla; AI for Developers | Bangla (Claude Code, MCP, AI Agent, RAG).
