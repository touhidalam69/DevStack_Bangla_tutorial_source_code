<!-- Written by tutorial-factory (npm run render) from the video's demo/ and script.json; changes made here are overwritten. -->

# Software Engineer Salary in Bangladesh 2026: Real Data by Experience, and the Job Market

[![Coming soon on YouTube](https://img.shields.io/badge/YouTube-coming%20soon-lightgrey?logo=youtube&logoColor=white)](https://www.youtube.com/@devstackbangla) [![Download source.zip](https://img.shields.io/badge/Download%20source.zip-2EA44F?logo=github&logoColor=white)](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/bd-software-salary/source.zip) ![Node.js](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=white)

> Source code for **বাংলাদেশে Software Engineer-এর বেতন কত? চাকরির আসল অবস্থা ২০২৬** on [DevStack Bangla](https://www.youtube.com/@devstackbangla), narrated in Bangla with English subtitles.

[All videos](../../README.md#videos)

Software engineer salary in Bangladesh, 2026: one site says about 20,000 Taka a month, another 97,000. I ran my own code on seventy real salaries to see what you earn after how many years.

## Software engineer salaries in Bangladesh, by experience

The small Node.js project from the video. It reads a salary table published in May 2026 (people filled in a
Google Form with their company, title, years of experience and monthly salary in Tk) and prints the median monthly
salary for each band of experience. A second script compares job offers by what they pay in a year.

Source of the table: [What Bangladeshi Tech Companies Are Paying Employees in 2026](https://tahanima.github.io/what-bangladeshi-tech-companies-are-paying-employees-in-2026/)
(May 2, 2026). The author's own note: "the data may not be entirely accurate". The data is not copied here:
`npm run fetch` downloads the page on your machine.

### Run it

Node.js 24 or later, no packages to install.

```
npm run fetch      # downloads the page, saves its table to .cache/pay-2026.json
npm run analyze    # median monthly salary by years of experience, engineering and QA roles
npm run offer -- 52000:2:0.5 50000:2:1    # monthly:bonuses:bonus share, one per offer
npm test           # unit tests, no network
```

What `analyze` does:

- keeps engineering and QA titles; interns, trainees and other roles (analyst, designer, officer) are counted apart;
- a salary range counts as its midpoint, and so does a range of years ("0-3" is 1.5, "<2" is 1, "2+" is 2);
- an amount it cannot read for sure ("Tk. 50,00": fifty thousand or five thousand?) is left out, not guessed.

The result on 2026-11-21 (70 rows, 56 engineering):

```
years    rows  median      lowest-highest
0-1 yrs    21  Tk 42,500   25,000-67,500
2-3 yrs    22  Tk 69,000   25,000-115,000
4-5 yrs    12  Tk 117,500  85,000-270,000
6+ yrs      1  Tk 500,000  500,000-500,000
```

Self-reported data from people who chose to fill in a form: read it as one market, not the whole country.

## Project structure

Browse the files above, or download them all as [source.zip](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/raw/main/src/bd-software-salary/source.zip) (7 files).

```
bd-software-salary/
├── analyze.mjs
├── fetch.mjs
├── lib.mjs
├── lib.test.mjs
├── offer.mjs
├── package.json
└── README.md
```

## Questions

Ask in the comments of the video, in Bangla or English, or [open an issue](https://github.com/touhidalam69/DevStack_Bangla_tutorial_source_code/issues/new/choose).

More in the playlist on [DevStack Bangla](https://www.youtube.com/@devstackbangla): Programming Career & Tech Trends | Bangla.
