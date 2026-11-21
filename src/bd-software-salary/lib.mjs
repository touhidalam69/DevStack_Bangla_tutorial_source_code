// Helpers for reading a published salary table and summarising it.
// No dependencies: plain Node.js 24.

/** The rows of the first <table> in an HTML page, as arrays of cell texts. */
export function parseTable(html) {
  const table = html.match(/<table[\s\S]*?<\/table>/i)?.[0] ?? '';
  const rows = [];
  for (const tr of table.matchAll(/<tr[\s\S]*?<\/tr>/gi)) {
    const cells = [...tr[0].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)]
      .map(m => decode(m[1].replace(/<[^>]+>/g, '')).trim());
    if (cells.length) rows.push(cells);
  }
  return rows;
}

function decode(s) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
}

/** "Tk. 45,000 - Tk. 60,000" -> 52500 */
export function parseSalary(text) {
  const nums = [...text.matchAll(/\d[\d,\s]*/g)]
    .map(m => Number(m[0].replace(/[,\s]/g, '')))
    .filter(n => n > 0);
  if (!nums.length) return null;
  return nums.length === 1 ? nums[0] : (nums[0] + nums[1]) / 2;
}

/** "Tk. 50,00" is unclear: after a comma come three digits. */
export function isClearAmount(text) {
  return !/\d,\d{1,2}(?!\d)/.test(text);
}

/** "4.6" -> 4.6, "0-3" -> 1.5, "<2" -> 1, "2+" -> 2. */
export function parseYears(text) {
  const t = text.replace(/\s/g, '');
  let m;
  if ((m = t.match(/^(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)$/))) return (Number(m[1]) + Number(m[2])) / 2;
  if ((m = t.match(/^<(\d+(?:\.\d+)?)$/))) return Number(m[1]) / 2;
  if ((m = t.match(/^(\d+(?:\.\d+)?)\+?$/))) return Number(m[1]);
  return null;
}

const ENGINEERING =
  /engineer|developer|programmer|architect|\bs?qa\b/i;
const NOT_A_JOB = /intern|trainee/i;
const OTHER_ROLE = /analyst|designer|talent|officer|manager/i;

/** What kind of row this is: engineering, intern, or other. */
export function roleOf(title) {
  if (NOT_A_JOB.test(title)) return 'intern';
  if (ENGINEERING.test(title) && !OTHER_ROLE.test(title)) {
    return 'engineering';
  }
  return 'other';
}

export const BANDS = [
  {name: '0-1 yrs', from: 0, to: 1},
  {name: '2-3 yrs', from: 2, to: 3},
  {name: '4-5 yrs', from: 4, to: 5},
  {name: '6+ yrs', from: 6, to: Infinity},
];

export function bandOf(years) {
  const y = Math.round(years);
  return BANDS.find(b => y >= b.from && y <= b.to)?.name ?? null;
}

export function median(values) {
  const v = [...values].sort((a, b) => a - b);
  if (!v.length) return null;
  const mid = Math.floor(v.length / 2);
  return v.length % 2 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
}

export function mean(values) {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;
}

/** One year of an offer: 12 monthly salaries plus the festival bonuses. */
export function yearly({monthly, bonuses, bonusShare}) {
  return 12 * monthly + bonuses * bonusShare * monthly;
}

export const num = n => Math.round(n).toLocaleString('en-US');
export const tk = n => 'Tk ' + num(n);
