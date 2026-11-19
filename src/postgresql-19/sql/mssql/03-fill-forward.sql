-- IGNORE NULLS has been in SQL Server since 2022: the same query runs here.
SET NOCOUNT ON;
DROP TABLE IF EXISTS prices;
CREATE TABLE prices (day date PRIMARY KEY, price decimal(8,2));
INSERT INTO prices VALUES
  ('2026-11-01', 120.00),
  ('2026-11-02', NULL),
  ('2026-11-03', NULL),
  ('2026-11-04', 135.00),
  ('2026-11-05', NULL);

SELECT day, price,
       LAST_VALUE(price) IGNORE NULLS OVER (ORDER BY day) AS price_filled
FROM prices
ORDER BY day;
