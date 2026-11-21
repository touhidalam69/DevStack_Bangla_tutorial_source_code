import assert from 'node:assert/strict';
import test from 'node:test';
import {bandOf, isClearAmount, mean, median, parseSalary, parseTable, parseYears, roleOf, yearly} from './lib.mjs';

test('reads the rows of a table', () => {
  const html = '<table><tr><th>Company</th><th>Salary</th></tr><tr><td>A &amp; B</td><td>Tk. 30,000</td></tr></table>';
  assert.deepEqual(parseTable(html), [['Company', 'Salary'], ['A & B', 'Tk. 30,000']]);
});

test('salary: a single amount, a range, a spaced amount', () => {
  assert.equal(parseSalary('Tk. 100,000'), 100000);
  assert.equal(parseSalary('Tk. 45,000 - Tk. 60,000'), 52500);
  assert.equal(parseSalary('Tk. 270, 000'), 270000);
  assert.equal(parseSalary(''), null);
});

test('an amount with a short thousands group is unclear', () => {
  assert.equal(isClearAmount('Tk. 50,00'), false);
  assert.equal(isClearAmount('Tk. 50,000'), true);
});

test('years: plain, range, under, plus', () => {
  assert.equal(parseYears('4.6'), 4.6);
  assert.equal(parseYears('0-3'), 1.5);
  assert.equal(parseYears('<2'), 1);
  assert.equal(parseYears('2+'), 2);
  assert.equal(parseYears('-'), null);
});

test('roles', () => {
  assert.equal(roleOf('Jr. Software Engineer'), 'engineering');
  assert.equal(roleOf('SQA Engineer II'), 'engineering');
  assert.equal(roleOf('Software Engineer Trainee'), 'intern');
  assert.equal(roleOf('Data Analyst'), 'other');
});

test('bands, median and mean', () => {
  assert.equal(bandOf(0.5), '0-1 yrs');
  assert.equal(bandOf(3.6), '4-5 yrs');
  assert.equal(median([30, 10, 20]), 20);
  assert.equal(median([10, 20, 30, 40]), 25);
  assert.equal(mean([10, 20, 30, 500]), 140);
});

test('a year of an offer', () => {
  assert.equal(yearly({monthly: 50000, bonuses: 2, bonusShare: 0.5}), 650000);
  assert.equal(yearly({monthly: 50000, bonuses: 2, bonusShare: 1}), 700000);
});
