-- Listed in many "what's new in PostgreSQL 19" articles written during the
-- betas. None of them is in the release: each one is a syntax error.
SELECT status, count(*) FROM orders GROUP BY ALL;

UPDATE rooms FOR PORTION OF booked FROM '2026-01-01'
  TO '2026-02-01' SET room = 2;

CREATE PROPERTY GRAPH shop_graph VERTEX TABLES (customers);
