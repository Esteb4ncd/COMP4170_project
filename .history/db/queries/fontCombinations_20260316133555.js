const pool = require('../index');

async function getRandomCombination() {
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
    LIMIT 1;
  `;

    const result = await pool.query(query);
    return result.rows[0] || null;
}

module.exports = {
    getRandomCombination,
};