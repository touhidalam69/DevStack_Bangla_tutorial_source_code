<!-- Written by tutorial-factory (npm run render). Change the video's demo/README.md or script.json instead. -->

# Will AI Replace Software Engineers? A 2026 Guide for Junior Developers

Source code for the video **Will AI Replace Software Engineers? Junior Developer-দের 2026 Guide** on [DevStack Bangla](https://www.youtube.com/@devstackbangla).

Will AI replace software engineers? Is AI taking junior developer jobs? Real 2026 data and a hands-on Node.js demo, explained in Bangla with English subtitles.

- Download: click [source.zip](source.zip) (7 files), then "Download raw file", and unzip it.
- Playlists: Programming Career & Tech Trends | Bangla; AI for Developers | Bangla (Claude Code, MCP, AI Agent, RAG)

## Files in source.zip

```
ai-junior-dev-careers/package.json
ai-junior-dev-careers/paginate.js
ai-junior-dev-careers/paginate.test.js
ai-junior-dev-careers/products.js
ai-junior-dev-careers/README.md
ai-junior-dev-careers/render.js
ai-junior-dev-careers/server.js
```

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
