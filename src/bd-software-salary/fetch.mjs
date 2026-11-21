// Downloads the published 2026 salary table and saves its rows to .cache/pay-2026.json.
import fs from 'node:fs';
import {parseTable} from './lib.mjs';

const URL = 'https://tahanima.github.io/what-bangladeshi-tech-companies-are-paying-employees-in-2026/';

const res = await fetch(URL);
if (!res.ok) throw new Error(`${URL}: HTTP ${res.status}`);
const html = await res.text();

const [header, ...rows] = parseTable(html);
const keys = ['company', 'title', 'years', 'salary', 'increments', 'increment', 'bonuses', 'bonus', 'other'];
if (header?.length !== keys.length) throw new Error(`expected ${keys.length} columns, found ${header?.length}`);

const data = rows.map(cells => Object.fromEntries(keys.map((k, i) => [k, cells[i] ?? ''])));
fs.mkdirSync('.cache', {recursive: true});
fs.writeFileSync('.cache/pay-2026.json', JSON.stringify({source: URL, fetched: new Date().toISOString(), rows: data}, null, 2));
console.log(`${data.length} rows saved to .cache/pay-2026.json`);
