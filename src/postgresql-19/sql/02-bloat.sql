-- Archive job: 9 of every 10 old orders are deleted.
DELETE FROM orders WHERE id % 10 <> 0;

SELECT pg_stat_force_next_flush();
SELECT n_live_tup, n_dead_tup
FROM pg_stat_user_tables WHERE relname = 'orders';
SELECT pg_size_pretty(pg_table_size('orders')) AS table_size;

-- Plain VACUUM marks the space as reusable. It does not give it back.
VACUUM orders;
SELECT pg_size_pretty(pg_table_size('orders')) AS table_size;
