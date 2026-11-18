// tools.mjs: what the model may ask for, and the code that does it
import { readFileSync } from 'node:fs';

const expenses = JSON.parse(
  readFileSync(new URL('./expenses.json', import.meta.url), 'utf8'));

export const tools = [
  {
    type: 'function',
    function: {
      name: 'get_expenses',
      description: 'List my October expenses in one category',
      parameters: {
        type: 'object',
        properties: {
          category: { type: 'string' },
        },
        required: ['category'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'calculate',
      description: 'Calculate a math expression, like 120 + 85',
      parameters: {
        type: 'object',
        properties: {
          expression: { type: 'string' },
        },
        required: ['expression'],
      },
    },
  },
];

function getExpenses({ category }) {
  const rows = expenses.filter((e) => e.category === category);
  return rows.map((e) => `${e.date} ${e.item}: ${e.amount}`).join('\n');
}

function calculate({ expression }) {
  if (!/^[\d\s+\-*/().]+$/.test(expression)) {
    return 'Error: only numbers and + - * / ( ) are allowed';
  }
  return String(Function(`return (${expression})`)());
}

export function runTool(name, args) {
  if (name === 'get_expenses') return getExpenses(args);
  if (name === 'calculate') return calculate(args);
  return `Error: no tool named ${name}`;
}
