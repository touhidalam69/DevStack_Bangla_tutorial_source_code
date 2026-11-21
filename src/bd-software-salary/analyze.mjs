// Median monthly salary by years of experience, engineering roles only.
import fs from 'node:fs';
import {BANDS, bandOf, isClearAmount, mean, median, num, parseSalary, parseYears, roleOf, tk} from './lib.mjs';

const {rows} = JSON.parse(fs.readFileSync('.cache/pay-2026.json', 'utf8'));

const kept = [];
const unclear = [];
let interns = 0, other = 0;
for (const r of rows) {
  const role = roleOf(r.title);
  if (role === 'intern') { interns++; continue; }
  if (role === 'other') { other++; continue; }
  const salary = parseSalary(r.salary);
  const years = parseYears(r.years);
  if (salary == null || years == null || !isClearAmount(r.salary)) { unclear.push(r.salary); continue; }
  kept.push({salary, years, band: bandOf(years)});
}

console.log(`rows: ${rows.length}  engineering: ${kept.length}`);
console.log(`interns: ${interns}  other roles: ${other}`);
if (unclear.length) console.log(`unclear, left out: ${unclear.map(s => JSON.stringify(s)).join(', ')}`);
console.log('');
console.log('years    rows  median      lowest-highest');
for (const b of BANDS) {
  const s = kept.filter(k => k.band === b.name).map(k => k.salary);
  if (!s.length) continue;
  console.log(`${b.name.padEnd(7)}  ${String(s.length).padStart(4)}  ${tk(median(s)).padEnd(10)}  ${num(Math.min(...s))}-${num(Math.max(...s))}`);
}
const all = kept.map(k => k.salary);
console.log('');
console.log(`all engineering: mean ${tk(mean(all))}, median ${tk(median(all))}`);
