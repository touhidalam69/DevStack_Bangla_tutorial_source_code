-- A price list with gaps: NULL means "no change that day".
DROP TABLE IF EXISTS prices;
CREATE TABLE prices (day date PRIMARY KEY, price numeric(8,2));
INSERT INTO prices VALUES
  ('2026-11-01', 120.00),
  ('2026-11-02', NULL),
  ('2026-11-03', NULL),
  ('2026-11-04', 135.00),
  ('2026-11-05', NULL);

-- PostgreSQL 19: IGNORE NULLS carries the last known price forward.
SELECT day, price,
       last_value(price) IGNORE NULLS
         OVER (ORDER BY day) AS price_filled
FROM prices
ORDER BY day;
