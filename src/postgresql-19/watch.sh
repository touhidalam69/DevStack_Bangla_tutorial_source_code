#!/bin/bash
# Plays the app while maintenance runs: every 0.25 s it reads one order and
# updates one, each with a 100 ms lock timeout, and prints the strongest
# lock held on the table. Usage: watch.sh "<maintenance command>"
export PGUSER=postgres PGDATABASE=shop
psql -qc "$1" >/dev/null 2>&1 &
job=$!
start=$(date +%s%N)
try() {
  psql -qAt -c "SET lock_timeout = '100ms'" -c "$1" >/dev/null 2>&1 \
    && echo "ok     " || echo "BLOCKED"
}
while kill -0 $job 2>/dev/null; do
  t=$(( ($(date +%s%N) - start) / 1000000 ))
  lock=$(psql -qAt -c "SELECT mode FROM pg_locks
    WHERE relation = 'orders'::regclass AND granted
      AND mode IN ('AccessExclusiveLock', 'ShareUpdateExclusiveLock')
    ORDER BY mode LIMIT 1")
  r=$(try "SELECT amount FROM orders WHERE id = 20")
  w=$(try "UPDATE orders SET status = 'paid' WHERE id = 20")
  printf '%5d ms  read %s  write %s  %s\n' "$t" "$r" "$w" "${lock:-no lock}"
  sleep 0.25
done
psql -qAt -c "SELECT 'orders is now ' || pg_size_pretty(pg_table_size('orders'))"
