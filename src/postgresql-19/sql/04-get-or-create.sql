-- "Give me this tag's id; create the tag if it is not there."
DROP TABLE IF EXISTS tags;
CREATE TABLE tags (
  id   int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL UNIQUE
);
INSERT INTO tags (name) VALUES ('urgent');

-- Before 19: DO NOTHING returns no row when the tag already exists.
INSERT INTO tags (name) VALUES ('urgent')
ON CONFLICT (name) DO NOTHING
RETURNING id;

-- PostgreSQL 19: DO SELECT returns the row that was already there.
INSERT INTO tags (name) VALUES ('urgent')
ON CONFLICT (name) DO SELECT
RETURNING id, name;

-- A new tag is inserted and returned by the same statement.
INSERT INTO tags (name) VALUES ('gift')
ON CONFLICT (name) DO SELECT
RETURNING id, name;
