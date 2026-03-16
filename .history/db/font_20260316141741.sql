CREATE TABLE IF NOT EXISTS fonts (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL UNIQUE,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS font_combinations (
  id                 SERIAL PRIMARY KEY,
  header_font_id     INTEGER NOT NULL REFERENCES fonts(id) ON DELETE RESTRICT,
  subheader_font_id  INTEGER NOT NULL REFERENCES fonts(id) ON DELETE RESTRICT,
  body_font_id       INTEGER NOT NULL REFERENCES fonts(id) ON DELETE RESTRICT,
  created_at         TIMESTAMP NOT NULL DEFAULT NOW(),

  CONSTRAINT unique_font_combination
    UNIQUE (header_font_id, subheader_font_id, body_font_id)
);