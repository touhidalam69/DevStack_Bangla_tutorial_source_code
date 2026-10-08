// check-trust.mjs: recompute one survey headline from the data
const url = 'https://survey.stackoverflow.co/2026/ai/data/ai-trust.md';
const text = await (await fetch(url)).text();

const section = text.split('### ')[1]; // the "All Respondents" table
const rows = [...section.matchAll(/^\| (.+?) \| ([\d,]+) \|/gm)].map(
  (m) => ({ answer: m[1], count: Number(m[2].replaceAll(',', '')) }),
);
const total = rows.reduce((sum, r) => sum + r.count, 0);
const pct = (n) => ((n / total) * 100).toFixed(1) + '%';

console.log('Respondents:', total);
const trust = rows.filter((r) => r.answer.startsWith('I trust it'));
for (const r of trust) console.log(pct(r.count), r.answer);
const trusting = trust.reduce((sum, r) => sum + r.count, 0);
console.log('Any "I trust it" answer:', pct(trusting));
