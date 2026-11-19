-- ...and write one.
SET lock_timeout = '500ms';
UPDATE orders SET status = 'paid' WHERE id = 20 RETURNING id, status;
