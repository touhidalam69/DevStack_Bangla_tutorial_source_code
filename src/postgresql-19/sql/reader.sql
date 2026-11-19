-- What the app does while maintenance runs: read one order.
SET lock_timeout = '500ms';
SELECT id, amount FROM orders WHERE id = 20;
