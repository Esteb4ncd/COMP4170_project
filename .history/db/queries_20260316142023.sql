-- Query to create 2 tables: fonts and font_combinations

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

-- Query to stop from using repeated fonts in the same combination
ALTER TABLE font_combinations
ADD CONSTRAINT different_fonts_check
CHECK (
    header_font_id <> subheader_font_id
    AND header_font_id <> body_font_id
    AND subheader_font_id <> body_font_id
);

-- Query to insert sample data into fonts table
INSERT INTO fonts (name) VALUES
    ('Playfair Display'),
    ('Lato'),
    ('Open Sans'),
    ('Roboto'),
    ('Montserrat'),
    ('Oswald'),
    ('Source Sans Pro'),
    ('Raleway'),
    ('PT Sans'),
    ('Merriweather'),
    ('Nunito'),
    ('Ubuntu'),
    ('Poppins'),
    ('Rubik'),
    ('Work Sans'),
    ('Inter'),
    ('Fira Sans'),
    ('Quicksand'),
    ('Karla'),
    ('Libre Baskerville'),
    ('Crimson Text'),
    ('Lora'),
    ('Bebas Neue'),
    ('Barlow'),
    ('DM Sans'),
    ('Space Grotesk'),
    ('Outfit'),
    ('Manrope'),
    ('Plus Jakarta Sans'),
    ('Sora')
ON CONFLICT (name) DO NOTHING;

-- Query to add a sample font combination
INSERT INTO font_combinations (header_font_id, subheader_font_id, body_font_id)
SELECT h.id, s.id, b.id
FROM fonts h, fonts s, fonts b
WHERE h.name = 'Playfair Display'
  AND s.name = 'Inter'
  AND b.name = 'Lato'
ON CONFLICT DO NOTHING;

INSERT INTO font_combinations (header_font_id, subheader_font_id, body_font_id)
SELECT h.id, s.id, b.id
FROM fonts h, fonts s, fonts b
WHERE h.name = 'Bebas Neue'
  AND s.name = 'Montserrat'
  AND b.name = 'Open Sans'
ON CONFLICT DO NOTHING;

INSERT INTO font_combinations (header_font_id, subheader_font_id, body_font_id)
SELECT h.id, s.id, b.id
FROM fonts h, fonts s, fonts b
WHERE h.name = 'Merriweather'
  AND s.name = 'Work Sans'
  AND b.name = 'Source Sans Pro'
ON CONFLICT DO NOTHING;

INSERT INTO font_combinations (header_font_id, subheader_font_id, body_font_id)
SELECT h.id, s.id, b.id
FROM fonts h, fonts s, fonts b
WHERE h.name = 'Lora'
  AND s.name = 'Poppins'
  AND b.name = 'Nunito'
ON CONFLICT DO NOTHING;

INSERT INTO font_combinations (header_font_id, subheader_font_id, body_font_id)
SELECT h.id, s.id, b.id
FROM fonts h, fonts s, fonts b
WHERE h.name = 'Crimson Text'
    AND s.name = 'DM Sans'
    AND b.name = 'Inter'
ON CONFLICT DO NOTHING;