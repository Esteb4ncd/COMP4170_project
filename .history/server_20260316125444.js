require('dotenv').config();
const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test DB connection (for Part 1: simple health check)
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1');
    res.json({ ok: true, database: 'connected' });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// View engine and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Font list (Part 2: no database – in-memory list of Google Font names)
const FONT_LIST = [
  'Playfair Display', 'Lato', 'Open Sans', 'Roboto', 'Montserrat',
  'Oswald', 'Source Sans Pro', 'Raleway', 'PT Sans', 'Merriweather',
  'Nunito', 'Ubuntu', 'Poppins', 'Rubik', 'Work Sans',
  'Inter', 'Fira Sans', 'Quicksand', 'Karla', 'Libre Baskerville',
  'Crimson Text', 'Lora', 'Bebas Neue', 'Barlow', 'DM Sans',
  'Space Grotesk', 'Outfit', 'Manrope', 'Plus Jakarta Sans', 'Sora',
];

function pickRandom(arr, n = 1) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return n === 1 ? shuffled[0] : shuffled.slice(0, n);
}

// Random combination of 3 fonts (no DB)
app.get('/api/random-combination', (req, res) => {
  const [header, subheader, body] = pickRandom(FONT_LIST, 3);
  res.json({ header, subheader, body });
});

// Main page
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
