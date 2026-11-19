-- How much does the foreign key cost on a bulk insert?
-- Run on PostgreSQL 18 and 19: same PC, same data, JIT off on both.
SET jit = off;
DROP TABLE IF EXISTS order_items, products;

CREATE TABLE products (id int PRIMARY KEY, name text NOT NULL);
INSERT INTO products
SELECT g, 'Product ' || g FROM generate_series(1, 10000) g;

CREATE TABLE order_items (
  id         bigint GENERATED ALWAYS AS IDENTITY,
  product_id int NOT NULL REFERENCES products (id),
  qty        int NOT NULL
);

\timing on
INSERT INTO order_items (product_id, qty)
SELECT 1 + g % 10000, 1 + g % 5
FROM generate_series(1, 2000000) g;
\timing off

-- The same insert with no foreign key, to see the cost of the check alone.
TRUNCATE order_items;
ALTER TABLE order_items DROP CONSTRAINT order_items_product_id_fkey;
\timing on
INSERT INTO order_items (product_id, qty)
SELECT 1 + g % 10000, 1 + g % 5
FROM generate_series(1, 2000000) g;
\timing off
