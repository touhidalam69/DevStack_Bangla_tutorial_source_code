// Compare job offers by what they pay in a year, not by the monthly number.
// Usage: node offer.mjs <monthly>:<bonuses>:<bonus share> ...
//   node offer.mjs 52000:2:0.5 50000:2:1
import {num, tk, yearly} from './lib.mjs';

const offers = process.argv.slice(2).map((arg, i) => {
  const [monthly, bonuses, bonusShare] = arg.split(':').map(Number);
  if (![monthly, bonuses, bonusShare].every(Number.isFinite)) throw new Error(`bad offer "${arg}"`);
  return {name: String.fromCharCode(65 + i), monthly, bonuses, bonusShare};
});

for (const o of offers) {
  o.year = yearly(o);
  const bonus = o.bonusShare * o.monthly;
  console.log(`${o.name}: 12 x ${num(o.monthly)} + ${o.bonuses} x ${num(bonus)} = ${tk(o.year)}`);
}
if (offers.length > 1) {
  const best = offers.reduce((a, b) => (b.year > a.year ? b : a));
  const next = Math.max(...offers.filter(o => o !== best).map(o => o.year));
  console.log(`${best.name} pays ${tk(best.year - next)} more a year`);
}
