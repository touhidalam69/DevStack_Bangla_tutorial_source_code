// The client's own check of invoices.csv (written before the agent's session, kept outside the demo folder).
// The shop is in Dhaka: its dates are day/month/year, so 01/11/2026 is 1 November 2026.
// Usage: node check.mjs <folder with invoices.csv>
import fs from 'node:fs';
import path from 'node:path';

const want = [
  {invoice: '1041', date: '2026-11-01', customer: 'Rahim Traders', total: 3250},
  {invoice: '1042', date: '2026-11-02', customer: 'Karim, Sons & Co.', total: 2160},
  {invoice: '1043', date: '2026-11-02', customer: 'Nusrat Fashion House', total: 1200},
  {invoice: '1044', date: '2026-11-03', customer: 'Sabbir Hossain', total: 3050},
  {invoice: '1045', date: '2026-11-04', customer: 'Green Leaf Pharmacy', total: 5500},
  {invoice: '1046', date: '2026-11-04', customer: 'Tania Akter', total: 1450},
];

/** RFC 4180: commas inside quotes, doubled quotes. */
function parse(text) {
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((x) => x.trim()));
}

/** The date as YYYY-MM-DD: ISO as it is; dd/mm/yyyy (the shop's own form) read the Bangladeshi way. */
function day(s) {
  s = s.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s);
  return m ? `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` : s;
}

const file = path.join(process.argv[2] || '.', 'invoices.csv');
const [head, ...body] = parse(fs.readFileSync(file, 'utf8'));
const col = (name) => head.findIndex((h) => h.trim().toLowerCase() === name);
const at = {date: col('date'), invoice: col('invoice'), customer: col('customer'), total: col('total_bdt')};
let bad = 0;
for (const w of want) {
  const r = body.find((x) => x[at.invoice]?.trim().replace(/^#/, '') === w.invoice);
  const problems = [];
  if (!r) problems.push('missing');
  else {
    if (day(r[at.date]) !== w.date) problems.push(`date ${r[at.date].trim()} (should be ${w.date})`);
    if (r[at.customer]?.trim() !== w.customer) problems.push(`customer "${r[at.customer]}"`);
    if (Number(String(r[at.total]).replace(/[^\d.]/g, '')) !== w.total) problems.push(`total ${r[at.total]} (should be ${w.total})`);
  }
  if (problems.length) bad++;
  console.log(`${problems.length ? 'FAIL' : 'ok  '} ${w.invoice}  ${problems.join('; ')}`);
}
if (body.length !== want.length) { bad++; console.log(`FAIL rows: ${body.length} (should be ${want.length})`); }
console.log(bad ? `${bad} of ${want.length} rows wrong` : `all ${want.length} rows right`);
process.exit(bad ? 1 : 0);
