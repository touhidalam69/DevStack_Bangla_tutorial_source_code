// tools.test.mjs: the tools are plain code, so they get plain tests
// (no model needed: npm test)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runTool } from './tools.mjs';

test('get_expenses lists one category', () => {
  const out = runTool('get_expenses', { category: 'books' });
  assert.equal(out.split('\n').length, 2);
  assert.match(out, /Data structures book: 550/);
});

test('calculate does the math', () => {
  assert.equal(runTool('calculate', { expression: '120 + 85' }), '205');
  assert.equal(runTool('calculate', { expression: '(10 - 4) * 2' }), '12');
});

test('calculate refuses anything that is not math', () => {
  const out = runTool('calculate', {
    expression: 'process.exit(1)',
  });
  assert.match(out, /^Error/);
});

test('an unknown tool does not crash the agent', () => {
  assert.match(runTool('delete_files', {}), /^Error: no tool/);
});
