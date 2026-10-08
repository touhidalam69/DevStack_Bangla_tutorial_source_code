// Turns one page of products into a small HTML page.
export function renderPage(items, page, size) {
  const n = Number(page);
  const list = items.map((name) => `<li>${name}</li>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Products</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 0; background: #f6f7fb; color: #1b2030; }
  main { max-width: 760px; margin: 0 auto; padding: 40px 32px; }
  h1 { font-size: 44px; margin: 0 0 4px; }
  .meta { font-size: 22px; color: #5b6478; margin: 0 0 22px; }
  ul { list-style: none; padding: 0; margin: 0 0 26px; }
  li { font-size: 26px; background: #fff; border: 1px solid #dde1ea; border-radius: 10px;
       padding: 12px 18px; margin-bottom: 10px; }
  nav a { font-size: 22px; font-weight: 700; color: #fff; background: #1b2030;
          padding: 10px 22px; border-radius: 10px; text-decoration: none; margin-right: 12px; }
</style>
</head>
<body>
<main>
  <h1>Products</h1>
  <p class="meta">Page ${n} &middot; ${size} per page</p>
  <ul id="list">${list}</ul>
  <nav>
    <a id="prev" href="?page=${n - 1}&size=${size}">Previous</a>
    <a id="next" href="?page=${n + 1}&size=${size}">Next page</a>
  </nav>
</main>
</body>
</html>`;
}
