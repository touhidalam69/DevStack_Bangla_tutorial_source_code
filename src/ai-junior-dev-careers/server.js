import { createServer } from 'node:http';
import { paginate } from './paginate.js';
import { products } from './products.js';
import { renderPage } from './render.js';

const isWhole = (n) => Number.isInteger(n) && n >= 1;

createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  // URL values are text. Turn them into numbers here, once.
  const page = Number(url.searchParams.get('page') ?? 1);
  const size = Number(url.searchParams.get('size') ?? 3);

  if (!isWhole(page) || !isWhole(size)) {
    res.writeHead(400, { 'content-type': 'text/plain' });
    return res.end('page and size must be whole numbers from 1');
  }

  const items = paginate(products, page, size);
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(renderPage(items, page, size));
}).listen(3000, () => console.log('Open http://localhost:3000'));
