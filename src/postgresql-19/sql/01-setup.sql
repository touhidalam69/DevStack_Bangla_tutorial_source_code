-- A small shop: 10,000 customers and 5 million orders.
DROP TABLE IF EXISTS orders, customers;

CREATE TABLE customers (
  id   int PRIMARY KEY,
  name text NOT NULL
);

INSERT INTO customers
SELECT g, 'Customer ' || g FROM generate_series(1, 10000) g;

CREATE TABLE orders (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id int NOT NULL REFERENCES customers (id),
  status      text NOT NULL,
  amount      numeric(10,2) NOT NULL,
  note        text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

INSERT INTO orders (customer_id, status, amount, note)
SELECT 1 + g % 10000, 'done', g % 5000 + 0.50, repeat('x', 100)
FROM generate_series(1, 5000000) g;

SELECT pg_size_pretty(pg_table_size('orders')) AS table_size;
