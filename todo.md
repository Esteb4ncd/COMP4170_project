# Database status

## Done (Person 1)

### Connection
- `pg` is required and a `Pool` is created in `server.js` using `process.env.DATABASE_URL` (lines 10–12).

### Schema
- `db/schema.sql` defines the only table, `font_combinations`, with:
  - `id` (SERIAL PRIMARY KEY)
  - `header_font`, `subheader_font`, `body_font` (VARCHAR(255) NOT NULL)
  - `created_at` (TIMESTAMP DEFAULT NOW())

### Use of the DB in code
- The only place the DB is used is **GET /api/health** (lines 15–22): it runs `pool.query('SELECT 1')` to check that the app can talk to PostgreSQL.
- No other route uses `pool` or the `font_combinations` table.

---

## Not done (for teammates)

### Person 2
- **No INSERT:** No “Save combination” endpoint (e.g. `POST /api/combinations`) that inserts into `font_combinations`.

### Person 3
- **No SELECT:** No “list saved” endpoint or page that reads from `font_combinations`.

### Person 4
- **Table creation:** The SQL file exists; someone still has to run `db/schema.sql` against a real database (e.g. ElephantSQL) and set `DATABASE_URL` (Person 4 can document this).

---

## Summary
DB wiring and schema are done; the table exists only in SQL; the app only uses the DB for the health check. Saving and listing combinations still need to be implemented by the team.