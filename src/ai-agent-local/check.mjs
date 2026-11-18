// check.mjs: run the agent several times and check its answer
// against the real total from expenses.json (needs Ollama running).
// usage: node check.mjs [runs]
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const runs = Number(process.argv[2] ?? 3);
const question = 'How much did I spend on food in October?';

const expenses = JSON.parse(readFileSync('expenses.json', 'utf8'));
const truth = expenses
  .filter((e) => e.category === 'food')
  .reduce((sum, e) => sum + e.amount, 0);
const pattern = new RegExp(String(truth).replace(/\B(?=(\d{3})+$)/, ',?'));
console.log(`question: ${question}`);
console.log(`real total: ${truth}\n`);

let right = 0;
for (let i = 1; i <= runs; i++) {
  const started = Date.now();
  const out = execFileSync('node', ['agent.mjs', question], {
    encoding: 'utf8',
  });
  const seconds = ((Date.now() - started) / 1000).toFixed(1);
  const answer = out.trim().split('\n').at(-1);
  const ok = pattern.test(answer);
  if (ok) right++;
  console.log(`run ${i}: ${ok ? 'RIGHT' : 'WRONG'} (${seconds} s)`);
  console.log(`  ${answer}`);
}
console.log(`\n${right} of ${runs} right`);
process.exitCode = right === runs ? 0 : 1;
