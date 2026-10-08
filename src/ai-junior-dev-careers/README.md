<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# Will AI Replace Software Engineers? A 2026 Guide for Junior Developers

[![Watch on YouTube](https://img.shields.io/badge/Watch%20on%20YouTube-FF0000?logo=youtube&logoColor=white)](https://youtu.be/9nSyX7AyogQ) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/ai-junior-dev-careers/source.zip) ![Node.js](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=white)

> Source code for **Will AI Replace Software Engineers? Junior Developer-দের 2026 Guide** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[All videos](../../README.md#videos)

Will AI replace software engineers? Is AI taking junior developer jobs? Real 2026 data and a hands-on Node.js demo, explained in Bangla with English subtitles.

## Product pages: the pagination bug from the video

A tiny Node.js product list, three products per page, used in the video to show why AI-written code needs a
reviewer. The AI-suggested `paginate` passed its tests, but page 2 showed four products: the page number came
from the URL as text, and `3 + '3'` is `'33'`.

This is the fixed version:

- `paginate.js` starts each page at `(page - 1) * pageSize`.
- `server.js` turns the URL values into numbers once, and answers `400 Bad Request` for anything that is not a
  whole number from 1.
- `paginate.test.js` checks that page 1 starts at the first item and page 2 continues after it.

Needs Node.js 22 or newer (the video used Node.js 25). No packages to install.

```
npm test     # runs node --test: 2 tests pass
npm start    # http://localhost:3000, then try ?page=2 and ?page=abc
```

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/ai-junior-dev-careers/source.zip) (7 files).

```
ai-junior-dev-careers/
├── package.json
├── paginate.js
├── paginate.test.js
├── products.js
├── README.md
├── render.js
└── server.js
```

## Questions

Ask in the comments of [the video](https://youtu.be/9nSyX7AyogQ), in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlists on [DevStack Bangla](https://www.youtube.com/@devstackbangla): Programming Career & Tech Trends | Bangla; AI for Developers | Bangla (Claude Code, MCP, AI Agent, RAG).
