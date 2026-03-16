require('dotenv').config();
const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// console.log({
//   DB_USER: process.env.DB_USER,
//   DB_HOST: process.env.DB_HOST,
//   DB_NAME: process.env.DB_NAME,
//   DB_PASSWORD_TYPE: typeof process.env.DB_PASSWORD,
//   DB_PASSWORD_EXISTS: !!process.env.DB_PASSWORD,
//   DB_PORT: process.env.DB_PORT,
// });

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT || 5432),
});

// Test DB connection
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1');
    res.json({ ok: true, database: 'connected', result: result.rows });
  } catch (err) {
    console.error('HEALTH CHECK ERROR:', err);
    res.status(500).json({
      ok: false,
      error: err.message,
      code: err.code,
      detail: err.detail || null,
    });
  }
});

// View engine and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Random combination from database
app.get('/api/random-combination', async (req, res) => {
  try {
    const query = `
      SELECT
        h.name AS header,
        s.name AS subheader,
        b.name AS body
      FROM font_combinations fc
      JOIN fonts h ON fc.header_font_id = h.id
      JOIN fonts s ON fc.subheader_font_id = s.id
      JOIN fonts b ON fc.body_font_id = b.id
      ORDER BY RANDOM()
      LIMIT 1
    `;

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'No font combinations found in database'
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Failed to fetch random combination:', err);
    res.status(500).json({
      error: 'Failed to fetch font combination'
    });
  }
});

// Main page
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

console.log("DATABASE_URL:", process.env.DATABASE_URL);