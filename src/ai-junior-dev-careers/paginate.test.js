import { test } from 'node:test';
import assert from 'node:assert/strict';
import { paginate } from './paginate.js';

const items = [1, 2, 3, 4, 5, 6, 7];

test('page 1 starts at the first item', () => {
  assert.deepEqual(paginate(items, 1, 3), [1, 2, 3]);
});

test('page 2 continues after page 1', () => {
  assert.deepEqual(paginate(items, 2, 3), [4, 5, 6]);
});
