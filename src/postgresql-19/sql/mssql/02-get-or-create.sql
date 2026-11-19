-- Get-or-create on SQL Server: no single statement returns the existing row,
-- so it takes an insert-if-missing and then a select.
SET NOCOUNT ON;
DROP TABLE IF EXISTS tags;
CREATE TABLE tags (
  id   int IDENTITY PRIMARY KEY,
  name varchar(50) NOT NULL UNIQUE
);
INSERT INTO tags (name) VALUES ('urgent');

INSERT INTO tags (name)
SELECT 'urgent'
WHERE NOT EXISTS (
  SELECT 1 FROM tags WITH (UPDLOCK, HOLDLOCK)
  WHERE name = 'urgent');

SELECT id, name FROM tags WHERE name = 'urgent';
