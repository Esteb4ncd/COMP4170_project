-- Run this in your PostgreSQL database to create the table.
-- Example: psql -d font_pairing_db -f db/schema.sql

CREATE TABLE IF NOT EXISTS font_combinations (
  id             SERIAL PRIMARY KEY,
  header_font    VARCHAR(255) NOT NULL,
  subheader_font VARCHAR(255) NOT NULL,
  body_font      VARCHAR(255) NOT NULL,
  created_at     TIMESTAMP DEFAULT NOW()
);
