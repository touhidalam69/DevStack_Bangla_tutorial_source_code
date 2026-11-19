-- The same shop on SQL Server 2025: 5 million orders, 9 of 10 deleted.
SET NOCOUNT ON;
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  id          bigint IDENTITY PRIMARY KEY,
  customer_id int NOT NULL,
  status      varchar(10) NOT NULL,
  amount      decimal(10,2) NOT NULL,
  note        varchar(200),
  created_at  datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET()
);

INSERT INTO orders (customer_id, status, amount, note)
SELECT 1 + value % 10000, 'done', value % 5000 + 0.50, REPLICATE('x', 100)
FROM GENERATE_SERIES(1, 5000000);
EXEC sp_spaceused 'orders';

DELETE FROM orders WHERE id % 10 <> 0;
EXEC sp_spaceused 'orders';

-- Rebuild while the table stays readable and writable.
-- ONLINE = ON needs Enterprise (or Developer) edition.
ALTER INDEX ALL ON orders REBUILD WITH (ONLINE = ON);
EXEC sp_spaceused 'orders';
